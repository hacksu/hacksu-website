import type MarkdownIt from "markdown-it";
import { Entity, Fields, isBackend, Remult, type FieldsMetadata } from "remult";

const isLeader = (remult: Remult | undefined) => !!remult?.user?.isLeader;

@Entity("redirects", {
    allowApiRead: isLeader,
    allowApiCrud: isLeader,
    id: (r: FieldsMetadata<Redirect>) => r.urlSlug
})
export class Redirect {
    @Fields.string()
    urlSlug!: string;

    @Fields.string()
    destination!: string;
}

@Entity("staff", {
    allowApiRead: true,
    allowApiCrud: isLeader
})
export class StaffMember {
    @Fields.uuid()
    id!: string;

    @Fields.string()
    name!: string;

    @Fields.integer()
    gradYear!: number;

    @Fields.string({
        validate: t => ["Spring", "Summer", "Fall"].includes(t)
    })
    gradTerm!: "Spring" | "Summer" | "Fall";

    @Fields.string()
    github?: string;

    @Fields.string()
    photo?: string;

    @Fields.json()
    titles: string[] = [];

    @Fields.string()
    link!: string;

    @Fields.boolean()
    isCurrent!: boolean;
}

let md_event: MarkdownIt;
@Entity("events", {
    allowApiRead: true,
    allowApiCrud: isLeader,
    saving: async (event: Event) => {
        if (isBackend()) {
            if (!md_event) {
                md_event = (await import("markdown-it")).default();
            }
            event.descriptionHTML = md_event.render(event.descriptionMD || "");
        }
    }
})
export class Event {
    @Fields.uuid()
    id!: string;

    @Fields.string()
    title!: string;

    @Fields.string()
    date!: string;

    @Fields.string()
    presenter!: string;

    @Fields.string()
    link!: string;

    @Fields.string()
    descriptionMD!: string;

    @Fields.string()
    descriptionHTML!: string;

    @Fields.string()
    photo?: string;
}

let md_note: MarkdownIt;
@Entity("notes", {
    allowApiRead: true,
    allowApiCrud: isLeader,
    saving: async (note: Note) => {
        if (isBackend()) {
            if (!md_note) {
                md_note = (await import("markdown-it")).default();
            }
            note.notesHTML = md_note.render(note.notesMD || "");
        }
    }
})
export class Note {
    @Fields.uuid()
    id!: number;

    @Fields.string()
    title!: string;

    @Fields.string()
    date!: string;

    @Fields.string()
    notesMD!: string;

    @Fields.string()
    notesHTML!: string;
}

let md_information: MarkdownIt;
@Entity("informations", {
    allowApiRead: true,
    allowApiCrud: isLeader,
    saving: async (information: Information) => {
        if (isBackend()) {
            if (!md_information) {
                md_information = (await import("markdown-it")).default();
            }
            information.descriptionHTML = md_information.render(information.descriptionMD || "");
        }
    }
})
export class Information {
    @Fields.uuid()
    id!: string;

    @Fields.string()
    title!: string;

    @Fields.string()
    link!: string;

    @Fields.string()
    descriptionMD!: string;

    @Fields.string()
    descriptionHTML!: string;

    @Fields.string()
    photo!: string;
}

@Entity("lesson_icons", {
    allowApiRead: true,
    allowApiCrud: isLeader,  // TO DISABLE AUTH: Change to 'true'
    id: (r: FieldsMetadata<LessonIcon>) => r.categoryName
})
export class LessonIcon {
    @Fields.string()
    categoryName!: string;

    @Fields.string()
    iconifyId!: string;
}