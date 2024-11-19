import { State, Action, StateContext, Selector } from '@ngxs/store';
import { IUser } from '../modules/users/interfaces';
import { Injectable } from '@angular/core';

export class UpdateUser {
  static readonly type = '[User] UpdateUser';
  constructor(public user: IUser) { }
}

export class SetUser {
  static readonly type = '[User] SetUser';
  constructor(public user: IUser) { }
}

export class ClearUser {
  static readonly type = '[User] ClearUser';
}

export interface GlobalStateModel {
  user: IUser;
}

@State<GlobalStateModel>({
  name: 'user',
  defaults: {
    user: {} as IUser
  }
})
@Injectable()
export class GlobalState {
  @Selector()
  static getUser(state: GlobalStateModel): IUser | null {
    return state.user;
  }

  // @Action(GlobalUserActions.UpdateUser)
  // updateUser(ctx: StateContext<GlobalStateModel>, { user }: GlobalUserActions.UpdateUser) {
  //   ctx.patchState({ user });
  // }

  @Action(SetUser)
  setUser(ctx: StateContext<GlobalStateModel>, action: SetUser) {
    const state = ctx.getState()
    ctx.setState({
      ...state,
      user: action.user
    })
  }

  @Action(ClearUser)
  clearUser(ctx: StateContext<GlobalStateModel>) {
    const state = ctx.getState()
    ctx.setState({
      ...state,
      user: {} as IUser
    })
  }
}


export class GlobalUserSelectors {
  @Selector([GlobalState])
  static getUser(state: GlobalStateModel): IUser | null {
    return state.user;
  }

  @Selector([GlobalState])
  static isUserActive(state: GlobalStateModel): boolean {
    return state.user?.active ?? false;
  }

  @Selector([GlobalState])
  static getUserRole(state: GlobalStateModel): string | null {
    return state.user?.role?.name ?? null;
  }
}
