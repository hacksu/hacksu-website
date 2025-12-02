import express from 'express';

const router = express.Router();

// Fetch GitHub repositories for lessons
const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_API_VERSION = '2022-11-28';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  pushed_at: string;
  language: string | null;
  url: string;
}

interface LessonRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  updated_at: string;
  language: string | null;
  topics: string[];
}

const createGitHubHeaders = (
  token: string,
  accept = 'application/vnd.github+json'
) => ({
  Authorization: `Bearer ${token}`,
  Accept: accept,
  'X-GitHub-Api-Version': GITHUB_API_VERSION
});

const fetchRepoTopics = async (
  repo: GitHubRepo,
  token: string
): Promise<string[]> => {
  try {
    const response = await fetch(`${repo.url}/topics`, {
      headers: createGitHubHeaders(
        token,
        'application/vnd.github.mercy-preview+json'
      )
    });

    if (!response.ok) {
      console.warn(`Failed to fetch topics for ${repo.name}: ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.names || [];
  } catch (err) {
    console.warn(`Failed to fetch topics for ${repo.name}:`, err);
    return [];
  }
};

router.get('/lessons/repos', async (req, res) => {
  try {
    const githubToken = process.env.GITHUB_TOKEN;

    if (!githubToken) {
      return res
        .status(500)
        .json({ error: 'GitHub token not configured' });
    }

    // Fetch all pages of repos from GitHub
    let allRepos: GitHubRepo[] = [];
    let nextUrl: string | null = `${GITHUB_API_BASE}/orgs/hacksu/repos?per_page=100&sort=updated`;

    while (nextUrl) {
      const response = await fetch(nextUrl, {
        headers: createGitHubHeaders(githubToken)
      });

      if (!response.ok) {
        throw new Error(
          `GitHub API error: ${response.status} ${response.statusText}`
        );
      }

      const repos: GitHubRepo[] = await response.json();
      allRepos = [...allRepos, ...repos];

      // Check for next page in link header
      const linkHeader: string | null = response.headers.get('link');
      nextUrl = null;

      if (linkHeader) {
        const nextMatch: RegExpMatchArray | null = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
        if (nextMatch) {
          nextUrl = nextMatch[1];
        }
      }
    }


    // Fetch topics for all repos in batches to avoid rate limiting
    const BATCH_SIZE = 20;
    const BATCH_DELAY = 100; // ms between batches
    const reposWithTopics: (GitHubRepo & { topics: string[] })[] = [];

    for (let i = 0; i < allRepos.length; i += BATCH_SIZE) {
      const batch = allRepos.slice(i, i + BATCH_SIZE);
      const batchResults = await Promise.all(
        batch.map(async (repo) => ({
          ...repo,
          topics: await fetchRepoTopics(repo, githubToken)
        }))
      );
      reposWithTopics.push(...batchResults);

      // Add delay between batches (except for the last batch)
      if (i + BATCH_SIZE < allRepos.length) {
        await new Promise(resolve => setTimeout(resolve, BATCH_DELAY));
      }
    }

    const reposWithoutTopics = reposWithTopics.filter(r => r.topics.length === 0);

    // Filter first, then map to final shape (avoid fetching README for non-lesson repos)
    const lessonRepos: LessonRepo[] = reposWithTopics
      .filter((repo) => repo.topics.includes('lesson'))
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        updated_at: repo.pushed_at,
        language: repo.language,
        topics: repo.topics
      }));

    res.json(lessonRepos);
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    res.status(500).json({ error: 'Failed to fetch repositories' });
  }
});

// Fetch README for a specific repository on demand
router.get('/lessons/repos/:name/readme', async (req, res) => {
  try {
    const githubToken = process.env.GITHUB_TOKEN;
    const repoName = req.params.name;

    if (!githubToken) {
      return res
        .status(500)
        .json({ error: 'GitHub token not configured' });
    }

    // Fetch README from GitHub
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/hacksu/${repoName}/readme`,
      {
        headers: createGitHubHeaders(
          githubToken,
          'application/vnd.github.html+json'
        )
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ error: 'README not found' });
      }
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`
      );
    }

    // GitHub returns HTML when using 'application/vnd.github.html+json'
    const readmeHtml = await response.text();

    res.json({ readme: readmeHtml });
  } catch (error) {
    console.error('Error fetching README:', error);
    res.status(500).json({ error: 'Failed to fetch README' });
  }
});

export default router;
