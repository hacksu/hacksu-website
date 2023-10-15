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
        urlSlug: Fields.string({}),
        destination: Fields.string()
    }
)
