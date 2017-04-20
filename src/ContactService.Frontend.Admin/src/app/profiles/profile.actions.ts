import { Profile } from "./profile.model";

export const profileActions = {
    ADD: "[Profile] Add",
    EDIT: "[Profile] Edit",
    DELETE: "[Profile] Delete",
    PROFILES_CHANGED: "[Profile] Profiles Changed"
};

export class ProfileEvent extends CustomEvent {
    constructor(eventName:string, profile: Profile) {
        super(eventName, {
            bubbles: true,
            cancelable: true,
            detail: { profile }
        });
    }
}

export class ProfileAdd extends ProfileEvent {
    constructor(profile: Profile) {
        super(profileActions.ADD, profile);        
    }
}

export class ProfileEdit extends ProfileEvent {
    constructor(profile: Profile) {
        super(profileActions.EDIT, profile);
    }
}

export class ProfileDelete extends ProfileEvent {
    constructor(profile: Profile) {
        super(profileActions.DELETE, profile);
    }
}

export class ProfilesChanged extends CustomEvent {
    constructor(profiles: Array<Profile>) {
        super(profileActions.PROFILES_CHANGED, {
            bubbles: true,
            cancelable: true,
            detail: { profiles }
        });
    }
}
