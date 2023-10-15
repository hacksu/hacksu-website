import { Entity, Fields, describeClass } from "remult";

export class Redirect {
    /** @type {string} */
    urlSlug;  // i.e. "discord"
    /** @type {string} */
    destination  // i.e. "https://discord.gg/..."
}

describeClass(
    Redirect,
    Entity(
        "redirects",
        {
            allowApiRead: true,
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
        titles: Fields.json()
    }
)
