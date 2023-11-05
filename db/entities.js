import { Entity, Fields, describeClass, isBackend } from "remult";

export class Redirect {
    /** @type {string} */
    urlSlug;  // i.e. "discord"
    /** @type {string} */
    destination;  // i.e. "https://discord.gg/..."
}

describeClass(
    Redirect,
    Entity(
        "redirects",
        {
            allowApiRead: r => r.user && r.user.isLeader,
            allowApiCrud: r => r.user && r.user.isLeader,
            id: r => r.urlSlug
        }
    ),
    {
        urlSlug: Fields.string(),
        destination: Fields.string()
    }
);

export class StaffMember {
    /** @type {number} */
    id;
    /** @type {string} */
    name;
    /** @type {number} */
    gradYear;
    /** @type {"Spring" | "Summer" | "Fall"} */
    gradTerm;
    /** @type {string | undefined} */
    github;
    /** @type {string | undefined} */
    photo;
    /** @type {string[]} */
    titles;
    /** @type {string} */
    link;
    /** @type {boolean} */
    isCurrent;
}

describeClass(
    StaffMember,
    Entity(
        "staff",
        {
            allowApiRead: true,
            allowApiCrud: r=> r.user && r.user.isLeader
        },
    ),
    {
        id: Fields.uuid(),
        name: Fields.string(),
        gradYear: Fields.integer(),
        gradTerm: Fields.string({
            validate: t => ["Spring", "Summer", "Fall"].includes(t)
        }),
        github: Fields.string(),
        photo: Fields.string(),
        link: Fields.string(),
        titles: Fields.json(),
        isCurrent: Fields.boolean()
    }
);

export class Event {
    /** @type {string} */
    id;
    /** @type {string} */
    title;
    /** @type {string} */
    date;
    /** @type {string} */
    subtitle;
    /** @type {string} */
    presenter;
    /** @type {string} */
    link;
    /** @type {string} */
    descriptionMD;
    /** @type {string} */
    descriptionHTML;
}

let md_event;

describeClass(
    Event,
    Entity(
        "events",
        {
            allowApiRead: true,
            allowApiCrud: r=> r.user && r.user.isLeader,
            saving: async event => {
                if (isBackend()){
                    if (!md) {
                        md = (await import("markdown-it")).default();
                    }
                    event.descriptionHTML = md_event.render(event.descriptionMD || "");
                }
            }
        },
    ),
    {
        id: Fields.uuid(),
        title: Fields.string(),
        date: Fields.string(),
        subtitle: Fields.string(),
        presenter: Fields.string(),
        link: Fields.string(),
        descriptionMD: Fields.string(),
        descriptionHTML: Fields.string()
    }
);

export class Note {
    /** @type {string} */
    id;
    /** @type {string} */
    title;
    /** @type {string} */
    date;
    /** @type {string} */
    notesMD;
    /** @type {string} */
    notesHTML;
}

let md_note;

describeClass(
    Note,
    Entity(
        "notes",
        {
            allowApiRead: true,
            allowApiCrud: r=> r.user && r.user.isLeader,
            saving: async note => {
                if (isBackend()) {
                    if (!md_note) {
                        md_note = (await import("markdown-it")).default();
                    }
                    note.notesHTML = md_note.render(note.notesMD || "");
                }
            }
        },
    ),
    {
        id: Fields.uuid(),
        title: Fields.string(),
        date: Fields.string(),
        notesMD: Fields.string(),
        notesHTML: Fields.string()
    }
);
