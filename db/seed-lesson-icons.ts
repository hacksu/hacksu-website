// Database seed script for lesson icons
// Run with: bun db/seed-lesson-icons.ts

import { remult } from "remult";
import { createPostgresDataProvider } from "remult/postgres";
import { LessonIcon } from "./entities";

// Default to local docker connection if not specified
const DEFAULT_URL = "postgresql://postgres:postgres@localhost:5432/hacksu";
let connectionString = process.env.DATABASE_URL || DEFAULT_URL;


const iconMappings = [
    // Languages
    { categoryName: 'javascript', iconifyId: 'logos:javascript' },
    { categoryName: 'typescript', iconifyId: 'logos:typescript-icon' },
    { categoryName: 'python', iconifyId: 'logos:python' },
    { categoryName: 'java', iconifyId: 'logos:java' },
    { categoryName: 'ruby', iconifyId: 'logos:ruby' },
    { categoryName: 'go', iconifyId: 'logos:go' },
    { categoryName: 'rust', iconifyId: 'logos:rust' },
    { categoryName: 'php', iconifyId: 'logos:php' },
    { categoryName: 'swift', iconifyId: 'logos:swift' },
    { categoryName: 'kotlin', iconifyId: 'logos:kotlin' },
    { categoryName: 'csharp', iconifyId: 'logos:c-sharp' },
    { categoryName: 'html', iconifyId: 'logos:html-5' },
    { categoryName: 'cs', iconifyId: 'logos:c-sharp' },
    { categoryName: 'jupyter', iconifyId: 'logos:jupyter' },

    // Frameworks/Libraries
    { categoryName: 'react', iconifyId: 'logos:react' },
    { categoryName: 'vue', iconifyId: 'logos:vue' },
    { categoryName: 'angular', iconifyId: 'logos:angular-icon' },
    { categoryName: 'svelte', iconifyId: 'logos:svelte-icon' },
    { categoryName: 'sqlite', iconifyId: 'logos:sqlite' },
    { categoryName: 'nextjs', iconifyId: 'logos:nextjs-icon' },
    { categoryName: 'next', iconifyId: 'logos:nextjs-icon' },
    { categoryName: 'express', iconifyId: 'logos:express' },
    { categoryName: 'fastify', iconifyId: 'logos:fastify-icon' },
    { categoryName: 'flask', iconifyId: 'logos:flask' },
    { categoryName: 'flutter', iconifyId: 'logos:flutter' },
    { categoryName: 'django', iconifyId: 'logos:django-icon' },
    { categoryName: 'fastapi', iconifyId: 'logos:fastapi-icon' },
    { categoryName: 'spring', iconifyId: 'logos:spring-icon' },
    { categoryName: 'laravel', iconifyId: 'logos:laravel' },
    { categoryName: 'nodejs', iconifyId: 'logos:nodejs-icon' },
    { categoryName: 'node', iconifyId: 'logos:nodejs-icon' },
    { categoryName: 'discord-bot', iconifyId: 'logos:discord-icon' },
    { categoryName: 'gulp', iconifyId: 'logos:gulp' },
    { categoryName: 'jquery', iconifyId: 'logos:jquery' },
    { categoryName: 'meteor', iconifyId: 'logos:meteor-icon' },

    // Tools/Databases
    { categoryName: 'git', iconifyId: 'logos:git-icon' },
    { categoryName: 'docker', iconifyId: 'logos:docker-icon' },
    { categoryName: 'kubernetes', iconifyId: 'logos:kubernetes' },
    { categoryName: 'mongodb', iconifyId: 'logos:mongodb-icon' },
    { categoryName: 'postgresql', iconifyId: 'logos:postgresql' },
    { categoryName: 'mysql', iconifyId: 'logos:mysql-icon' },
    { categoryName: 'redis', iconifyId: 'logos:redis' },
    { categoryName: 'vercel', iconifyId: 'logos:vercel-icon' },
    { categoryName: 'unix', iconifyId: 'logos:linux-tux' },
    { categoryName: 'github', iconifyId: 'logos:github-icon' },
    { categoryName: 'hosting', iconifyId: 'streamline-color:database-server-1' },
    { categoryName: 'wasm', iconifyId: 'logos:webassembly' },
    { categoryName: 'ai', iconifyId: 'mingcute:ai-line' },
    { categoryName: 'art', iconifyId: 'streamline-color:paint-palette-flat' },
    { categoryName: 'native', iconifyId: 'logos:android-icon' },
];

async function seedLessonIcons() {
    console.log('----------------------------------------');
    console.log('   Connecting to database...');
    console.log(`   URL: ${connectionString.replace(/:[^:@]+@/, ':****@')}`); // Mask password
    console.log('----------------------------------------');

    const dataProvider = await createPostgresDataProvider({
        connectionString
    });
    remult.dataProvider = dataProvider;

    console.log('Starting lesson icons seed...');

    const repo = remult.repo(LessonIcon);

    // Clear existing icons
    const existing = await repo.find();
    for (const icon of existing) {
        await repo.delete(icon);
    }
    console.log(`Deleted ${existing.length} existing icons`);

    // Insert all mappings
    for (const mapping of iconMappings) {
        await repo.insert(mapping);
        console.log(`Added: ${mapping.categoryName} -> ${mapping.iconifyId}`);
    }

    console.log(`\nSuccessfully seeded ${iconMappings.length} lesson icons!`);
}

// Execute immediately
seedLessonIcons()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    });

export { seedLessonIcons };
