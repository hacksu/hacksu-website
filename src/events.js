export default { //used google sheets extension to export calendar in JSON format
    el: '#table',
    data() {
        return {
        rows: [
            {
                "event": "Github lesson HTML/CSS",
                "date": "9/19/2023",
                "level": "Beginner",
                "presenter": "Mitch",
                "link": "https://github.com/hacksu/HTML-CSS"
            },
            {
                "event": "Github lesson Python Discord Bot",
                "date": "9/26/2023",
                "level": "Beginner",
                "presenter": "Brandon",
                "link": "https://github.com/hacksu/nextcord-bot"
            },
            {
                "event": "GitHub lesson react-tutorial",
                "date": "10/3/2023",
                "level": "Intermediate",
                "presenter": "Mitch",
                "link": "https://github.com/hacksu/react-tutorial"
            },
            {
                "event": "GitHub lesson NextJS",
                "date": "10/10/2023",
                "level": "Intermediate",
                "presenter": "Brandon"
            },
            {
                "event": "Collin Werner - Progressive",
                "date": "10/17/2023",
                "level": "Any",
                "presenter": "Guest"
            },
            {
                "event": "resume review",
                "date": "10/24/2023",
                "level": "Beginner",
                "presenter": "TBA"
            },
            {
                "event": "GitHub lesson flutter-app-lesson",
                "date": "10/31/2023",
                "level": "Beginner",
                "presenter": "Brandon",
                "link": "https://github.com/hacksu/flutter-app-lesson"
            },
            {
                "event": "Roy Heath III - server management",
                "date": "11/7/2023",
                "level": "Any",
                "presenter": "Guest"
            },
            {
                "event": "GitHub lesson How-to-discord-bot",
                "date": "11/14/2023",
                "level": "Intermediate",
                "presenter": "Mitch",
                "link": "https://github.com/hacksu/Python-Discord-Bot"
            },
            {
                "event": "GitHub lesson python-SQL-lesson",
                "date": "11/21/2023",
                "level": "Intermediate",
                "presenter": "Brandon",
                "link": "https://github.com/hacksu/Python-SQL-Lesson"
            },
            {
                "event": "Dr. Nesterenko - research and academia",
                "date": "11/28/2023",
                "level": "Any",
                "presenter": "Guest"
            },
            {
                "event": "GitHub lesson express-guestbook",
                "date": "12/5/2023",
                "level": "Beginner",
                "presenter": "Mitch",
                "link": "https://github.com/hacksu/express-guestbook"
            },
            {
                "event": "Break",
                "date": "12/12/2023"
            },
            {
                "event": "Break",
                "date": "12/19/2023"
            },
            {
                "event": "Break",
                "date": "12/26/2023"
            },
            {
                "event": "Break",
                "date": "1/2/2024"
            },
            {
                "event": "Some AI Expert - Natural Language Model",
                "date": "1/9/2024",
                "level": "Any",
                "presenter": "Guest"
            },
            {
                "event": "GitHub lesson socket-penguin-club",
                "date": "1/16/2024",
                "level": "Intermediate",
                "presenter": "Mitch",
                "link": "https://github.com/hacksu/socket-penguin-club"
            },
            {
                "event": "GitHub lesson bash-scripting",
                "date": "1/23/2024",
                "level": "Beginner",
                "presenter": "Brandon",
                "link": "https://github.com/hacksu/bash-scripting"
            },
            {
                "event": "Zaz - programming for math majors (lisp)",
                "date": "1/30/2024",
                "level": "Any",
                "presenter": "Guest"
            },
            {
                "event": "Github lesson CSharp-Interfaces",
                "date": "2/6/2024",
                "level": "Intermediate",
                "presenter": "Brandon",
                "link": "https://github.com/hacksu/CSharp-Interfaces"
            },
            {
                "event": "GitHub lesson qt-GUI",
                "date": "2/13/2024",
                "level": "Intermediate",
                "presenter": "Mitch"
            },
            {
                "event": "Discussion on AI ethics",
                "date": "2/20/2024",
                "level": "Any",
                "presenter": "Anna"
            },
            {
                "event": "GitHub lesson c++ calculator",
                "date": "2/27/2024",
                "level": "Beginner",
                "presenter": "Brandon"
            },
            {
                "event": "GitHub lesson flask",
                "date": "3/5/2024",
                "level": "Beginner",
                "presenter": "Mitch",
                "link": "https://github.com/hacksu/flask-recipe"
            },
            {
                "event": "Guest speaker from industry",
                "date": "3/12/2024",
                "level": "Any",
                "presenter": "Guest"
            },
            {
                "event": "GitHub lesson R",
                "date": "3/19/2024",
                "level": "Beginner",
                "presenter": "Brandon",
                "link": "https://github.com/hacksu/r-lesson"
            },
            {
                "event": "Break",
                "date": "3/26/2024"
            },
            {
                "event": "Dr. Maletic - srcML, coding conventions",
                "date": "4/2/2024",
                "level": "Any",
                "presenter": "Guest"
            },
            {
                "event": "GitHub lesson angularlesson",
                "date": "4/9/2024",
                "level": "Beginner",
                "presenter": "Brandon",
                "link": "https://github.com/hacksu/angularlesson"
            },
            {
                "event": "GitHub lesson p5",
                "date": "4/16/2024",
                "level": "Intermediate",
                "presenter": "Mitch"
            },
            {
                "event": "Guest speaker from industry",
                "date": "4/23/2024",
                "level": "Any",
                "presenter": "Guest"
            },
            {
                "event": "GitHub lesson GitHub/GitHub pages",
                "date": "4/30/2024",
                "level": "Beginner",
                "presenter": "Brandon",
                "link": "https://github.com/hacksu/git-and-gh-pages"
            }
        ]
        }
    },
    computed: {
        "columns": function columns() {
            if (this.rows.length == 0) {
                return [];
            }
            return Object.keys(this.rows[0])
        }
    }
}