/*
 * Copyright (c) 2023, Oracle and/or its affiliates.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 2.0,
 * as published by the Free Software Foundation.
 *
 * This program is also distributed with certain software (including
 * but not limited to OpenSSL) that is licensed under separate terms, as
 * designated in a particular file or component or in included license
 * documentation.  The authors of MySQL hereby grant you an additional
 * permission to link the program and your derivative works with the
 * separately licensed software that they have included with MySQL.
 * This program is distributed in the hope that it will be useful,  but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See
 * the GNU General Public License, version 2.0, for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA
 */

/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-classes-per-file */
/* eslint-disable padding-line-between-statements */
/* eslint-disable no-underscore-dangle */

import {
    MrsBaseService, MrsBaseSchema, MrsBaseObjectQuery, IMrsBaseObject,
    IMrsResultList, MrsBaseObjectUpdate, MrsBaseObjectCall, IMrsFetchData,
    MrsBaseObjectCreate, IMrsDeleteResult, MrsBaseObjectDelete,
    ICreateOptions, IDeleteOptions, IFindOptions, IUpdateOptions,
} from "./MrsBaseClasses";

// --- MySQL Shell for VS Code Extension Only --- Begin
/**
 * Triggers the interactive MRS authentication process.
 *
 * @param serviceUrl The URL of the MRS service
 * @param authPath The path of the authentication endpoints
 * @param authApp The id of the authApp to authenticate against
 * @param userName The optional name of the user
 */
declare function mrsAuthenticate(serviceUrl: string, authPath: string, authApp?: string, userName?: string): void;
// --- MySQL Shell for VS Code Extension Only --- End

/* =============================================================================
 * MRS Service /myService
 */

export class MyService extends MrsBaseService {
    private _mrsNotes?: MyServiceMrsNotes;
    private _sakila?: MyServiceSakila;

    public constructor() {
        super("https://localhost:8443/myService", "/authentication");
    }

    public get mrsNotes(): MyServiceMrsNotes { if (this._mrsNotes === undefined) { this._mrsNotes = new MyServiceMrsNotes(this, "/mrsNotes"); } return this._mrsNotes; }
    public get sakila(): MyServiceSakila { if (this._sakila === undefined) { this._sakila = new MyServiceSakila(this, "/sakila"); } return this._sakila; }

    // --- MySQL Shell for VS Code Extension Only --- Begin
    public static authenticate = (username?: string, authApp = "MRS"): void => {
        mrsAuthenticate("https://localhost:8443/myService", "/authentication", authApp, username);
    };

    public authenticate = (username?: string, authApp = "MRS"): void => {
        MyService.authenticate(username, authApp);
    };
    // --- MySQL Shell for VS Code Extension Only --- End
}

/* -----------------------------------------------------------------------------
 * MRS Schema /myService/mrsNotes
 */

export class MyServiceMrsNotes extends MrsBaseSchema {
    private _note?: MyServiceMrsNotesNoteRequest;
    private _noteUpdate?: MyServiceMrsNotesNoteUpdateRequest;

    public get note(): MyServiceMrsNotesNoteRequest { if (this._note === undefined) { this._note = new MyServiceMrsNotesNoteRequest(this); } return this._note; }
    public get noteUpdate(): MyServiceMrsNotesNoteUpdateRequest { if (this._noteUpdate === undefined) { this._noteUpdate = new MyServiceMrsNotesNoteUpdateRequest(this); } return this._noteUpdate; }
}

export class MyServiceMrsNotesObjectRequest {
    public constructor(
        public schema: MyServiceMrsNotes) {
    }
}


/*
 * MRS Object /myService/mrsNotes/note (Table)
 */

export class MyServiceMrsNotesNoteRequest extends MyServiceMrsNotesObjectRequest {

    public static readonly schemaRequestPath = "/mrsNotes";
    public static readonly requestPath = "/note";

    public get = <K extends keyof IMyServiceMrsNotesNote>(
        ...args: K[]): MrsBaseObjectQuery<IMyServiceMrsNotesNote, IMyServiceMrsNotesNoteParams> => {
        return new MrsBaseObjectQuery<IMyServiceMrsNotesNote, IMyServiceMrsNotesNoteParams>(
            this.schema, MyServiceMrsNotesNoteRequest.requestPath, args);
    };

    public getAllExcept = <K extends keyof IMyServiceMrsNotesNote>(
        ...args: K[]): MrsBaseObjectQuery<IMyServiceMrsNotesNote, IMyServiceMrsNotesNoteParams> => {
        return new MrsBaseObjectQuery<IMyServiceMrsNotesNote, IMyServiceMrsNotesNoteParams>(
            this.schema, MyServiceMrsNotesNoteRequest.requestPath, [], args);
    };

    public put = (
        note: IMyServiceMrsNotesNote,
        key?: string[]): MrsBaseObjectUpdate<IMyServiceMrsNotesNote, IMyServiceMrsNotesNoteParams> => {
        return new MrsBaseObjectUpdate<IMyServiceMrsNotesNote, IMyServiceMrsNotesNoteParams>(
            this.schema, MyServiceMrsNotesNoteRequest.requestPath, note, key !== undefined ? key : [String(note.id)]);
    };
}

export interface IMyServiceMrsNotesNote extends IMrsBaseObject {
    contentBeginning?: string,
    createDate?: string,
    id?: number,
    lastUpdate?: string,
    lockedDown?: number,
    ownNote?: number,
    pinned?: number,
    shared?: number,
    tags?: object,
    title?: string,
    userId?: string,
    viewOnly?: number,
    content?: string,
}

export interface IMyServiceMrsNotesNoteParams {
    contentBeginning?: string,
    createDate?: string,
    id?: number,
    lastUpdate?: string,
    lockedDown?: number,
    ownNote?: number,
    pinned?: number,
    shared?: number,
    tags?: object,
    title?: string,
    viewOnly?: number,
    content?: string,
}


/*
 * MRS Object /myService/mrsNotes/noteUpdate (Procedure)
 */

export class MyServiceMrsNotesNoteUpdateRequest extends MyServiceMrsNotesObjectRequest {

    public static readonly schemaRequestPath = "/mrsNotes";
    public static readonly requestPath = "/note";

    public call = (
        noteUpdateParams: IMyServiceMrsNotesNoteUpdateParams,
    ): MrsBaseObjectCall<IMyServiceMrsNotesNoteUpdate, IMyServiceMrsNotesNoteUpdateParams> => {
        return new MrsBaseObjectCall<IMyServiceMrsNotesNoteUpdate, IMyServiceMrsNotesNoteUpdateParams>(
            this.schema, MyServiceMrsNotesNoteUpdateRequest.requestPath, noteUpdateParams);
    };
}

export interface IMyServiceMrsNotesNoteUpdateParams extends IMrsFetchData {
    userId?: string,
    noteId: number,
    title: string,
    pinned: number,
    lockedDown: number,
    content: string,
    tags: object,
}

export interface IMyServiceMrsNotesNoteUpdate extends IMrsFetchData {
    success?: string,
    message?: string,
}

/* -----------------------------------------------------------------------------
 * MRS Schema /myService/sakila
 */

class MyServiceSakilaCountryQueryClass extends MrsBaseObjectQuery<IMyServiceSakilaCountry, IMyServiceSakilaCountryParams> { }

export class MyServiceSakila extends MrsBaseSchema {
    private _actor?: MyServiceSakilaActorRequest;
    private _country?: MyServiceSakilaCountryRequest;

    public get actor(): MyServiceSakilaActorRequest { if (this._actor === undefined) { this._actor = new MyServiceSakilaActorRequest(this); } return this._actor; }
    public get country(): MyServiceSakilaCountryRequest { if (this._country === undefined) { this._country = new MyServiceSakilaCountryRequest(this); } return this._country; }
}

export class MyServiceSakilaObjectRequest {
    public constructor(
        public schema: MyServiceSakila) {
    }
}

export class MyServiceSakilaActorRequest extends MyServiceSakilaObjectRequest {

    public static readonly schemaRequestPath = "/saklia";
    public static readonly requestPath = "/actor";

    public rest = {
        get: <K extends keyof IMyServiceSakilaActor>(
            ...args: K[]): MrsBaseObjectQuery<IMyServiceSakilaActor, IMyServiceSakilaActorParams> => {
            return new MrsBaseObjectQuery<IMyServiceSakilaActor, IMyServiceSakilaActorParams>(
                this.schema, MyServiceSakilaActorRequest.requestPath, args);
        },

        put: (
            actor: IMyServiceSakilaActor,
            key?: string[]): MrsBaseObjectUpdate<IMyServiceSakilaActor, IMyServiceSakilaActorParams> => {
            return new MrsBaseObjectUpdate<IMyServiceSakilaActor, IMyServiceSakilaActorParams>(
                this.schema, MyServiceSakilaActorRequest.requestPath, actor, key !== undefined ? key : [String(actor.actor_id)]);
        },

        post: (actor: IMyServiceSakilaActor): MrsBaseObjectCreate<IMyServiceSakilaActor> => {
            return new MrsBaseObjectCreate<IMyServiceSakilaActor>(this.schema, MyServiceSakilaActorRequest.requestPath, actor);
        },

        delete: (): MrsBaseObjectDelete<IMyServiceSakilaActorParams> => {
            return new MrsBaseObjectDelete<IMyServiceSakilaActorParams>(this.schema, MyServiceSakilaActorRequest.requestPath);
        },
    };

    public getAllExcept = <K extends keyof IMyServiceSakilaActor>(
        ...args: K[]): MrsBaseObjectQuery<IMyServiceSakilaActor, IMyServiceSakilaActorParams> => {
        return new MrsBaseObjectQuery<IMyServiceSakilaActor, IMyServiceSakilaActorParams>(
            this.schema, MyServiceSakilaActorRequest.requestPath, args);
    };

    public create = async (args: ICreateOptions<IMyServiceSakilaActor>): Promise<IMyServiceSakilaActor> => {
        const response = await this.rest.post(args.data).fetch();

        return response;
    };

    public createMany = async (args: ICreateOptions<IMyServiceSakilaActor[]>): Promise<IMyServiceSakilaActor[]> => {
        const result: IMyServiceSakilaActor[] = [];

        for (const item of args.data) {
            const response = await this.create({ data: item });

            result.push(response);
        }

        return result;
    };

    public delete = async (args: IDeleteOptions<IMyServiceSakilaActorParams>): Promise<IMrsDeleteResult> => {
        const response = await this.rest.delete().where(args.where).fetch();

        return response;
    };

    public deleteMany = async (args: IDeleteOptions<IMyServiceSakilaActorParams>): Promise<IMrsDeleteResult> => {
        const response = await this.delete(args);

        return response;
    };

    public findMany = async (args?: IFindOptions<IMyServiceSakilaActor, IMyServiceSakilaActorParams>): Promise<IMrsResultList<IMyServiceSakilaActor>> => {
        const request = new MrsBaseObjectQuery<IMyServiceSakilaActor, IMyServiceSakilaActorParams>(
            this.schema, MyServiceSakilaActorRequest.requestPath, args?.select)
            .where(args?.where).orderBy(args?.orderBy).limit(args?.take).offset(args?.skip);
        let response;
        if (args?.fetchAll && typeof args?.fetchAll === "boolean" && args?.fetchAll === true) {
            response = await request.fetchAll();
        } else if (args?.fetchAll && typeof args?.fetchAll !== "boolean") {
            response = await request.fetchAll(args?.fetchAll?.pageSize, args?.fetchAll?.progress);
        } else {
            response = await request.fetch();
        }
        return response;
    };

    public findFirst = async (args?: IFindOptions<IMyServiceSakilaActor, IMyServiceSakilaActorParams>): Promise<IMyServiceSakilaActor | undefined> => {
        const request = new MrsBaseObjectQuery<IMyServiceSakilaActor, IMyServiceSakilaActorParams>(
            this.schema, MyServiceSakilaActorRequest.requestPath, args?.select);
        const response = await request.where(args?.where).orderBy(args?.orderBy).limit(args?.take).offset(args?.skip).fetchOne();

        return response;
    };

    public update = async (args: IUpdateOptions<IMyServiceSakilaActorParams, ["actor_id"], { batch: false }>): Promise<IMyServiceSakilaActor> => {
        const response = await this.rest.put(args.data, [String(args.where.actor_id)])
            .fetch();

        return response;
    };

    public updateMany = async (args: IUpdateOptions<IMyServiceSakilaActorParams, ["actor_id"], { batch: true }>): Promise<IMyServiceSakilaActor[]> => {
        const result: IMyServiceSakilaActor[] = [];

        for (const { actor_id } of args.where) {
            const response = await this.update({ ...args, where: { actor_id } });

            result.push(response);
        }

        return result;
    };
}

export class MyServiceSakilaCountryRequest extends MyServiceSakilaObjectRequest {

    public static readonly schemaRequestPath = "/saklia";
    public static readonly requestPath = "/country";

    public get = <K extends keyof IMyServiceSakilaCountry>(
        ...args: K[]): MyServiceSakilaCountryQueryClass => {
        return new MyServiceSakilaCountryQueryClass(
            this.schema, MyServiceSakilaCountryRequest.requestPath, args);
    };

    public getAllExcept = <K extends keyof IMyServiceSakilaCountry>(
        ...args: K[]): MyServiceSakilaCountryQueryClass => {
        return new MyServiceSakilaCountryQueryClass(
            this.schema, MyServiceSakilaCountryRequest.requestPath, [], args);
    };

    public put = (
        actor: IMyServiceSakilaCountry,
        key?: string): MrsBaseObjectUpdate<IMyServiceSakilaCountry, IMyServiceSakilaCountryParams> => {
        return new MrsBaseObjectUpdate<IMyServiceSakilaCountry, IMyServiceSakilaCountryParams>(
            this.schema, MyServiceSakilaCountryRequest.requestPath, actor, key !== undefined ? [key] : [String(actor.country_id)]);
    };
}

/*
 * MRS Object - /myService/sakila/actor (Table)
 */

export interface IMyServiceSakilaActorFilmReference {
    title?: string;
    description?: string;
    categories?: string[];
    language?: string;
}

export interface IMyServiceSakilaActor extends IMrsBaseObject {
    actor_id?: number,
    last_name?: string,
    first_name?: string,
    last_update?: string,
    films?: IMyServiceSakilaActorFilmReference,
}

export interface IMyServiceSakilaActorParams {
    actor_id?: number,
    last_name?: string,
    first_name?: string,
    last_update?: string,
}

/*
 * MRS Object - /myService/sakila/country (Table)
 */

export interface IMyServiceSakilaCountry extends IMrsBaseObject {
    country_id?: number,
    country?: string,
    last_update?: string,
}

export interface IMyServiceSakilaCountryParams {
    country_id?: number,
    country?: string,
    last_update?: string,
}

/* =============================================================================
 * Tests
 */

export class test {
    private readonly whereSyntaxTest = (): void => {
        // Get myService object
        const myService = new MyService();

        // typed column name
        myService.sakila.actor.rest.get().where({ last_name: "WILLIS" });

        // simpleOperatorObject
        // cspell: ignore notnull
        myService.sakila.actor.rest.get().where({ last_name: { $like: "WIL%" } });
        myService.sakila.actor.rest.get().where({ last_name: { $notnull: null } });
        myService.sakila.actor.rest.get().where({ last_name: { $null: null } });
        myService.sakila.actor.rest.get().where({ actor_id: { $between: [null, 10] } });
        myService.sakila.actor.rest.get().where({ actor_id: { $between: [1, null] } });
        myService.sakila.actor.rest.get().where({ actor_id: { $between: [null, null] } });

        // complexOperatorObject
        myService.sakila.actor.rest.get().where({ $and: [{ last_name: "WILLIS" }, { first_name: "BEN" }] });
        myService.sakila.actor.rest.get().where({ $and: [{ last_name: { $like: "WIL%" } }, { first_name: "BEN" }] });
        myService.sakila.actor.rest.get().where({ $and: [{ last_name: { $like: "WIL%" } }, { first_name: { $like: "B%" } }] });
        myService.sakila.actor.rest.get().where({ actor_id: { $or: [{ $eq: 1 }, { $eq: 10 }] } });
        myService.sakila.actor.rest.get().where({ last_name: { $and: [{ $like: "WIL%" }, { first_name: { $like: "B%" } }] } });

        // [complexValues]
        myService.sakila.actor.rest.get().where({ actor_id: [{ $gt: 1 }, { $lt: 10 }] });

        // invalid expressions
        // TODO: @ts-expect-error invalid/empty value
        // Something similar to: rests://github.com/sindresorhus/type-fest/blob/main/source/require-at-least-one.d.ts
        myService.sakila.actor.rest.get().where({ last_name: {} });
        // @ts-expect-error no context
        myService.sakila.actor.rest.get().where({ $like: "WIL%" });
        // @ts-expect-error no context
        myService.sakila.actor.rest.get().where({ $and: [{ $lt: 5000 }, { $gt: 1000 }] });
        // @ts-expect-error invalid/incorrect nesting
        myService.sakila.actor.rest.get().where({ $and: [{ last_name: { $like: "WIL%" } }, { first_name: { $or: [{ $gt: 1 }, { $lt: 10 }] } }] });
        // @ts-expect-error invalid value
        myService.sakila.actor.rest.get().where({ last_name: [{ $and: [{ $like: "WIL%" }, { $like: "%IS" }] }] });
        // @ts-expect-error invalid operator type
        myService.sakila.actor.rest.get().where({ actor_id: { $like: 1 } });
        // @ts-expect-error invalid operator type
        myService.sakila.actor.rest.get().where({ last_name: { $null: "foo" } });
        // @ts-expect-error invalid operator type
        myService.sakila.actor.rest.get().where({ actor_id: { $between: [true, false] } });
    };

    private readonly orderBySyntaxTest = (): void => {
        myService.sakila.actor.rest.get().orderBy({ actor_id: "ASC" });
        myService.sakila.actor.rest.get().orderBy({ actor_id: "DESC" });
        myService.sakila.actor.rest.get().orderBy({ actor_id: 1 });
        myService.sakila.actor.rest.get().orderBy({ actor_id: -1 });
        myService.sakila.actor.rest.get().orderBy({ actor_id: "ASC", last_name: "DESC" });
        myService.sakila.actor.rest.get().orderBy({ actor_id: "ASC", last_name: -1 });
    };

    private readonly test = async (): Promise<void> => {
        const myService = new MyService();

        // Fetch REST Object JSON
        // explicit operator spec
        let result = await myService.sakila.actor.rest.get("first_name", "last_name")
            .where({ last_name: { $like: "WIL%" } }).offset(10).limit(10).fetch();
        console.log(result);

        // and/or with the same column
        result = await myService.sakila.country.get()
            .where({ country_id: { $and: [{ $gt: 10 }, { $lt: 25 }] } }).fetch();
        console.log(result);

        // high order filter
        result = await myService.sakila.actor.rest.get()
            .where({ $and: [{ last_name: { $like: "WI%" } }, { first_name: { $like: "B%" } }], actor_id: { $gt: 10 } }).fetch();
        console.log(result);

        // and/or with a different column
        result = await myService.sakila.actor.rest.get()
            .where({ first_name: { $and: [{ $like: "BR%" }, { last_name: { $like: "WIL%" } }] } }).fetch();
        console.log(result);

        result = await myService.sakila.actor.rest.get("first_name", "last_name")
            .where({ last_name: { $like: "WIL%" } }).fetch();
        console.log(result);

        // implicit operator spec
        result = await myService.sakila.actor.rest.get("first_name", "last_name")
            .where({ actor_id: 2 }).fetch();
        console.log(result);
    };
}

// --- MySQL Shell for VS Code Extension Only --- Begin
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const myService = new MyService();
// --- MySQL Shell for VS Code Extension Only --- End
