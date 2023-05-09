/**
 * TODO: JSDoc
 *  - Examples
 *  - Params
 *  - Description
 */

// #region Types
type RGBAColor = [number, number, number, number];

type EntityID = number;
type UserID = number;

type Vector2D = [number, number];
type Vector3D = [number, number, number];

type Path = string[];

interface PredictedGrenadeHit {
    EntityIndex: EntityID;
    Damage: number;
}

interface PredictedGrenade {
    IsLive: boolean;
    Owner: EntityID;
    Type: "Molotov" | "Grenade" | "Smoke" | "Flash" | "Decoy" | "Incendiary";
    EntityIndex: EntityID;
    Position: Vector3D;
    Hits: Array<PredictedGrenadeHit>;
}

interface AnimationLayer {
    Sequence: number;
    Activity: number;
    Weight: number;
    WeightDeltaRange: number;
    Cycle: number;
    PlaybackRate: number;
}

declare enum FrameStage {
    FRAME_START = 0,
    FRAME_NET_UPDATE_START,
    FRAME_NET_UPDATE_POSTDATAUPDATE_START,
    FRAME_NET_UPDATE_POSTDATAUPDATE_END,
    FRAME_NET_UPDATE_END,
    FRAME_RENDER_START,
    FRAME_RENDER_END,
}

declare enum HitboxIndex {
    HEAD = 0,
    NECK,
    PELVIS,
    BODY,
    THORAX,
    CHEST,
    UPPER_CHEST,
    RIGHT_THIGH,
    LEFT_CALF,
    RIGHT_CALF,
    LEFT_FOOT,
    RIGHT_FOOT,
    LEFT_HAND,
    RIGHT_HAND,
    LEFT_UPPER_ARM,
    LEFT_FOREARM,
    RIGHT_UPPER_ARM,
    RIGHT_FOREARM,
}

declare enum AnimationLayerIndex {
    AIMMATRIX = 0,
    WEAPON_ACTION,
    WEAPON_ACTION_RECROUCH,
    ADJUST,
    MOVEMENT_JUMP_OR_FALL,
    MOVEMENT_LAND_OR_CLIMB,
    MOVEMENT_MOVE,
    MOVEMENT_STRAFECHANGE,
    WHOLE_BODY,
    FLASHED,
    FLINCH,
    ALIVELOOP,
    LEAN,
}

declare type CallbackName =
    // Onetap Callbacks
    | "CreateMove"
    | "Draw"
    | "Unload"
    | "Material"
    | "ragebot_fire"
    | "FRAME_START"
    | "FRAME_RENDER_START"
    | "FRAME_RENDER_END"
    | "FRAME_NET_UPDATE_START"
    | "FRAME_NET_UPDATE_END"
    | "FRAME_NET_UPDATE_POSTDATAUPDATE_START"
    | "FRAME_NET_UPDATE_POSTDATAUPDATE_END"
    | "player_say"

    // CS:GO Callbacks
    | "player_death"
    | "other_death"
    | "player_hurt"
    | "item_purchase"
    | "bomb_beginplant"
    | "bomb_abortplant"
    | "bomb_planted"
    | "bomb_defused"
    | "bomb_exploded"
    | "bomb_dropped"
    | "bomb_pickup"
    | "defuser_dropped"
    | "defuser_pickup"
    | "announce_phase_end"
    | "cs_intermission"
    | "bomb_begindefuse"
    | "bomb_abortdefuse"
    | "hostage_follows"
    | "hostage_hurt"
    | "hostage_killed"
    | "hostage_rescued"
    | "hostage_stops_following"
    | "hostage_rescued_all"
    | "hostage_call_for_help"
    | "vip_escaped"
    | "vip_killed"
    | "player_radio"
    | "bomb_beep"
    | "weapon_fire"
    | "weapon_fire_on_empty"
    | "grenade_thrown"
    | "weapon_outofammo"
    | "weapon_reload"
    | "weapon_zoom"
    | "silencer_detach"
    | "inspect_weapon"
    | "weapon_zoom_rifle"
    | "player_spawned"
    | "item_pickup"
    | "item_pickup_slerp"
    | "item_pickup_failed"
    | "item_remove"
    | "ammo_pickup"
    | "item_equip"
    | "enter_buyzone"
    | "exit_buyzone"
    | "buytime_ended"
    | "enter_bombzone"
    | "exit_bombzone"
    | "enter_rescue_zone"
    | "exit_rescue_zone"
    | "silencer_off"
    | "silencer_on"
    | "buymenu_open"
    | "buymenu_close"
    | "round_prestart"
    | "round_poststart"
    | "round_start"
    | "round_end"
    | "grenade_bounce"
    | "hegrenade_detonate"
    | "flashbang_detonate"
    | "smokegrenade_detonate"
    | "smokegrenade_expired"
    | "molotov_detonate"
    | "decoy_detonate"
    | "decoy_started"
    | "tagrenade_detonate"
    | "inferno_startburn"
    | "inferno_expire"
    | "inferno_extinguish"
    | "decoy_firing"
    | "bullet_impact"
    | "player_footstep"
    | "player_jump"
    | "player_blind"
    | "player_falldamage"
    | "door_moving"
    | "round_freeze_end"
    | "mb_input_lock_success"
    | "mb_input_lock_cancel"
    | "nav_blocked"
    | "nav_generate"
    | "player_stats_updated"
    | "achievement_info_loaded"
    | "spec_target_updated"
    | "spec_mode_updated"
    | "hltv_changed_mode"
    | "cs_game_disconnected"
    | "cs_win_panel_round"
    | "cs_win_panel_match"
    | "cs_match_end_restart"
    | "cs_pre_restart"
    | "show_freezepanel"
    | "hide_freezepanel"
    | "freezecam_started"
    | "player_avenged_teammate"
    | "achievement_earned"
    | "achievement_earned_local"
    | "item_found"
    | "items_gifted"
    | "repost_xbox_achievements"
    | "match_end_conditions"
    | "round_mvp"
    | "player_decal"
    | "teamplay_round_start"
    | "show_survival_respawn_status"
    | "client_disconnect"
    | "gg_player_levelup"
    | "ggtr_player_levelup"
    | "assassination_target_killed"
    | "ggprogressive_player_levelup"
    | "gg_killed_enemy"
    | "gg_final_weapon_achieved"
    | "gg_bonus_grenade_achieved"
    | "switch_team"
    | "gg_leader"
    | "gg_team_leader"
    | "gg_player_impending_upgrade"
    | "write_profile_data"
    | "trial_time_expired"
    | "update_matchmaking_stats"
    | "player_reset_vote"
    | "enable_restart_voting"
    | "sfuievent"
    | "start_vote"
    | "player_given_c4"
    | "player_become_ghost"
    | "gg_reset_round_start_sounds"
    | "tr_player_flashbanged"
    | "tr_mark_complete"
    | "tr_mark_best_time"
    | "tr_exit_hint_trigger"
    | "bot_takeover"
    | "tr_show_finish_msgbox"
    | "tr_show_exit_msgbox"
    | "reset_player_controls"
    | "jointeam_failed"
    | "teamchange_pending"
    | "material_default_complete"
    | "cs_prev_next_spectator"
    | "cs_handle_ime_event"
    | "nextlevel_changed"
    | "seasoncoin_levelup"
    | "tournament_reward"
    | "start_halftime"
    | "ammo_refill"
    | "parachute_pickup"
    | "parachute_deploy"
    | "dronegun_attack"
    | "drone_dispatched"
    | "loot_crate_visible"
    | "loot_crate_opened"
    | "open_crate_instr"
    | "smoke_beacon_paradrop"
    | "survival_paradrop_spawn"
    | "survival_paradrop_break"
    | "drone_cargo_detached"
    | "drone_above_roof"
    | "choppers_incoming_warning"
    | "firstbombs_incoming_warning"
    | "dz_item_interaction"
    | "snowball_hit_player_face"
    | "survival_teammate_respawn"
    | "survival_no_respawns_warning"
    | "survival_no_respawns_final"
    | "player_ping"
    | "player_ping_stop"
    | "guardian_wave_restart";
// #endregion

// #region Onetap API
// #region Autostop
declare namespace Autostop {
    function ForceRetreat(): void;

    function IsRetreating(): boolean;

    function IsAutoPeeking(): boolean;
}
// #endregion
// #region UserCMD
declare namespace UserCMD {
    function SetMouseY<V extends number>(value: V): V;

    function SetMouseX<V extends number>(value: V): V;

    function GetMovement(): Vector3D;

    function SetViewAngles<V extends Vector3D, S extends boolean>(position: V, silent: S): S;

    function Send(): typeof UserCMD;

    function Choke(): typeof UserCMD;

    function SetButtons<V extends number>(value: V): V;

    function GetButtons(): number;

    function SetMovement<V extends Vector3D>(value: V): V;

    function SetAngles<V extends Vector3D>(value: V): V;

    function ForceJump(): typeof UserCMD;

    function ForceCrouch(): typeof UserCMD;
}
// #endregion
// #region Exploit
declare namespace Exploit {
    function OverrideTolerance<V extends number>(value: V): V;

    function OverrideShift<V extends number>(value: V): V;

    function EnableRecharge(): typeof Exploit;

    function DisableRecharge(): typeof Exploit;

    function Recharge(): typeof Exploit;

    function GetCharge(): 1 | 0;

    function GetNetworkedTickbase(): number;

    function GetPredictedTickbase(): number;

    function OverrideMaxProcessTicks<V extends number>(value: V): V;
}
// #endregion
// #region Globals
declare namespace Globals {
    function ChokedCommands(): number;

    function Realtime(): number;

    function Frametime(): number;

    function Curtime(): number;

    function TickInterval(): number;

    function Tickrate(): 64 | 128;

    function Tickcount(): number;

    function FrameStage(): FrameStage;
}
// #endregion
// #region GrenadePrediction
declare namespace GrenadePrediction {
    function GetLiveGrenades(): (PredictedGrenade | undefined)[];

    function GetPredictedGrenade(): PredictedGrenade | undefined;

    function Run(): void;
}
// #endregion
// #region UI
declare namespace UI {
    function RegisterCallback<P extends Path, F extends string>(path: P, func: F): void;

    function GetMenuPosition(): [number, number, number, number];

    function UpdateList<P extends Path, I extends string[]>(path: P, items: I): void;

    function RemoveItem<P extends Path>(path: P): void;

    function GetHotkey<P extends Path>(path: P): number;

    function SetHotkeyState<P extends Path, S extends "Always" | "Toggle" | "Hold" | "None">(path: P, state: S): void;

    function GetHotkeyState<P extends Path>(path: P): "Always" | "Toggle" | "Hold" | "None";

    function ToggleHotkey<P extends Path>(path: P): void;

    function SetColor<P extends Path, C extends RGBAColor>(path: P, color: C): void;

    function AddSubTab<P extends ["Legit" | "Rage" | "Visuals" | "Misc." | "Config", "SUBTAB_MGR"], N extends string>(
        path: P,
        name: N
    ): [...P, N];

    function AddTextbox<P extends Path, N extends string>(path: P, name: N): [...P, N];

    function AddColorPicker<P extends Path, N extends string>(path: P, name: N): [...P, N];

    function AddMultiDropdown<P extends Path, N extends string, E extends string[]>(path: P, name: N, elements: E): [...P, N];

    function AddDropdown<P extends Path, N extends string, E extends string[], S extends 1 | 0>(
        path: P,
        name: N,
        elements: E,
        search_bar: S
    ): [...P, N];

    function AddHotkey<P extends Path, N extends string, D extends string>(path: P, name: N, display_name: D): [...P, N];

    function AddSliderFloat<P extends Path, N extends string, F extends number, S extends number>(
        path: P,
        name: N,
        min: F,
        max: S
    ): [...P, N];

    function AddSliderInt<P extends Path, N extends string, F extends number, S extends number>(
        path: P,
        name: N,
        min: F,
        max: S
    ): [...P, N];

    function AddCheckbox<P extends Path, N extends string>(path: P, name: N): [...P, N];

    function SetValue<P extends Path, V extends number>(path: P, value: V): void;

    function GetChildren<P extends Path>(path: P): string[];

    function GetValue<P extends Path>(path: P): number;

    function GetString<P extends Path>(path: P): string;

    function GetColor<P extends Path>(path: P): RGBAColor;

    function IsMenuOpen(): boolean;

    function SetEnabled<P extends Path, S extends 1 | 0>(path: P, visible: S): void;
}
// #endregion
// #region Entity
declare namespace Entity {
    function GetAnimationLayer<ID extends EntityID, L extends AnimationLayerIndex>(index: ID, layer: L): AnimationLayer;

    function GetSteamID<ID extends EntityID>(index: ID): number;

    function DisableESP<ID extends EntityID>(index: ID): void;

    function DrawFlag<ID extends EntityID, F extends string, C extends RGBAColor>(index: ID, flag: F, color: C): void;

    // TODO: Object Interface
    function GetCCSWeaponInfo<ID extends EntityID>(index: ID): Object;

    function GetRenderBox<ID extends EntityID>(index: ID): Vector2D;

    function GetWeapons<ID extends EntityID>(index: ID): EntityID[];

    function GetEntitiesByClassID<C extends number>(class_id: C): EntityID[];

    function GetHitboxPosition<ID extends EntityID, H extends HitboxIndex>(index: ID, hitbox: H): Vector3D;

    function GetEyePosition<ID extends EntityID>(index: ID): Vector3D;

    function GetGameRulesProxy(): EntityID;

    function IsBot<ID extends EntityID>(index: ID): boolean;

    function GetWeapon<ID extends EntityID>(index: ID): EntityID;

    function SetProp<ID extends EntityID, T extends string, P extends string, V extends any>(index: ID, table: T, prop: P, value: V): any;

    function GetProp<ID extends EntityID, T extends string, P extends string>(index: ID, table: T, prop: P): any;

    function GetRenderOrigin<ID extends EntityID>(index: ID): Vector3D;

    function GetName<ID extends EntityID>(index: ID): string;

    function GetClassName<ID extends EntityID>(index: ID): string;

    function GetClassID<ID extends EntityID>(index: ID): number;

    function IsDormant<ID extends EntityID>(index: ID): boolean;

    function IsAlive<ID extends EntityID>(index: ID): boolean;

    function IsValid<ID extends EntityID>(index: ID): boolean;

    function IsLocalPlayer<ID extends EntityID>(index: ID): boolean;

    function IsEnemy<ID extends EntityID>(index: ID): boolean;

    function IsTeammate<ID extends EntityID>(index: ID): boolean;

    function GetEntityFromUserID<ID extends UserID>(index: ID): EntityID;

    function GetLocalPlayer(): EntityID;

    function GetTeammates(): EntityID[];

    function GetEnemies(): EntityID[];

    function GetPlayers(): EntityID[];

    function GetEntities(): EntityID[];
}
// #endregion
// #region Render
declare namespace Render {
    function GetFont<N extends string, S extends number, W extends boolean>(name: N, size: S, is_windows: W): number;

    function TextSize<T extends string, F extends number>(text: T, font: F): Vector2D;

    function String<X extends number, Y extends number, IS_C extends 1 | 0, T extends string, C extends RGBAColor, F extends number>(
        x: X,
        y: Y,
        centered: IS_C,
        text: T,
        color: C,
        font: F
    ): void;

    function FilledCircle<X extends number, Y extends number, R extends number, C extends RGBAColor>(x: X, y: Y, radius: R, color: C): void;

    function TexturedRect<X extends number, Y extends number, W extends number, H extends number, T extends number>(
        x: X,
        y: Y,
        width: W,
        height: H,
        texture: T
    ): void;

    function AddTexture<P extends string>(path: P): number;

    function Polygon<P extends [Vector2D, Vector2D, Vector2D], C extends RGBAColor>(points: P, color: C): void;

    function GradientRect<
        X extends number,
        Y extends number,
        W extends number,
        H extends number,
        IS_H extends 1 | 0,
        C1 extends RGBAColor,
        C2 extends RGBAColor
    >(x: X, y: Y, width: W, height: H, is_horizontal: IS_H, color1: C1, color2: C2): void;

    function GetScreenSize(): Vector2D;

    function WorldToScreen<P extends Vector3D>(point: P): Vector2D;

    function Circle<X extends number, Y extends number, R extends number, C extends RGBAColor>(x: X, y: Y, radius: R, color: C): void;

    function FilledRect<X extends number, Y extends number, W extends number, H extends number, C extends RGBAColor>(
        x: X,
        y: Y,
        width: W,
        height: H,
        color: C
    ): void;

    function Rect<X extends number, Y extends number, W extends number, H extends number, C extends RGBAColor>(
        x: X,
        y: Y,
        width: W,
        height: H,
        color: C
    ): void;

    function Line<X1 extends number, Y1 extends number, X2 extends number, Y2 extends number, C extends RGBAColor>(
        x1: X1,
        y1: Y1,
        x2: X2,
        y2: Y2,
        color: C
    ): void;
}
// #endregion
// #region Convar
declare namespace Convar {
    function SetString<C extends string, V extends string>(cvar: C, value: V): void;

    function GetString<C extends string>(cvar: C): string | boolean;

    function SetFloat<C extends string, V extends number>(cvar: C, value: V): void;

    function GetFloat<C extends string>(cvar: C): number | boolean;

    function SetInt<C extends string, V extends number>(cvar: C, value: V): void;

    function GetInt<C extends string>(cvar: C): number | boolean;
}
// #endregion
// #region Event
declare namespace Event {
    function GetString<N extends string>(field_name: N): string;

    function GetFloat<N extends string>(field_name: N): number;

    function GetInt<N extends string>(field_name: N): number;
}
// #endregion
// #region Trace
declare namespace Trace {
    function RawLine<ID extends EntityID, F extends Vector3D, S extends Vector3D, M extends number, T extends 0 | 1 | 2>(
        skip_entity: ID,
        from: F,
        to: S,
        mask: M,
        type: T
    ): number[];

    function Smoke<F extends Vector3D, T extends Vector3D>(from: F, to: T): number;

    function Bullet<A extends EntityID, V extends EntityID, F extends Vector3D, S extends Vector3D>(
        attacker: A,
        victim: V,
        from: F,
        to: S
    ): number[];

    function Line<ID extends EntityID, F extends Vector3D, S extends Vector3D>(skip_entity: ID, from: F, to: S): number[];
}
// #endregion
// #region Sound
declare namespace Sound {
    function StopMicrophone(): void;

    function PlayMicrophone<P extends string>(path: P): void;

    function Play<P extends string>(path: P): void;
}
// #endregion
// #region Local
declare namespace Local {
    function GetMaxDesync(): number;

    function IsDormantTo<E extends number>(entity: E): void;

    function GetCameraAngles(): Vector3D;

    function GetCameraPosition(): Vector3D;

    function SetCameraAngles<V extends Vector3D>(position: V): V;

    function SetCameraPosition<V extends Vector3D>(position: V): V;

    function GetInaccuracy(): number;

    function GetSpread(): number;

    function GetFakeYaw(): number;

    function GetRealYaw(): number;

    function SetClanTag<T extends string>(text: T): T;

    function SetViewAngles<V extends Vector3D>(position: V): V;

    function Latency(): number;
}
// #endregion
// #region Cheat
declare namespace Cheat {
    function PrintColor<T extends string, C extends RGBAColor>(color: C, text: T): T;

    function PrintChat<T extends string>(text: T): T;

    function PrintLog<T extends string, C extends RGBAColor>(text: T, color: C): void;

    function Print<T extends string>(text: T): T;

    function IsLegitConfigActive<ID extends number>(item_id: ID): boolean;

    function IsRageConfigActive<ID extends number>(item_id: ID): boolean;

    function GetUsername(): string;

    function RegisterCallback<C extends CallbackName, F extends string>(callback: C, func: F): void;

    function ExecuteCommand<C extends string>(cmd: C): void;
}
// #endregion
// #region Input
declare namespace Input {
    function IsConsoleOpen(): boolean;

    function IsChatOpen(): boolean;

    function ForceCursor<S extends 1 | 0>(state: S): void;

    function GetCursorPosition(): Vector2D;

    function IsKeyPressed<K extends number>(vkey_code: K): boolean;
}
// #endregion
// #region World
declare namespace World {
    function CreateLightningStrike<S extends boolean, P extends Vector3D>(sound: S, position: P): void;

    function GetModelIndex<P extends string>(model_path: P): number;

    function GetServerString(): string;

    function GetMapName(): string;
}
// #endregion
// #region AntiAim
declare namespace AntiAim {
    function SetLBYOffset<V extends number>(value: V): V;

    function SetRealOffset<V extends number>(value: V): V;

    function SetFakeOffset<V extends number>(value: V): V;

    function GetOverride(): boolean;

    function SetOverride<V extends 1 | 0>(value: V): V;
}
// #endregion
// #region Ragebot
declare namespace Ragebot {
    function IgnoreTargetHitbox<ID extends EntityID, H extends number>(index: ID, hitbox: H): void;

    function GetTargetHitchance(): number;

    function GetTargets(): EntityID[];

    function IgnoreTarget<ID extends EntityID>(index: ID): void;

    function ForceHitboxSafety<H extends number>(hitbox: H): void;

    function ForceTargetMinimumDamage<ID extends EntityID, D extends number>(index: ID, damage: D): void;

    function ForceTargetHitchance<ID extends EntityID, H extends number>(index: ID, hitchance: H): void;

    function ForceTargetSafety<ID extends EntityID>(index: ID): void;

    function ForceTarget<ID extends EntityID>(index: ID): void;

    function GetTarget(): EntityID;
}
// #endregion
// #region Material
declare namespace Material {
    function GetMaterialAtCrosshair(): string;

    function Replace<F extends string, S extends string>(original_material: F, material: S): void;

    function RefreshProxy<M extends string>(material: M): void;

    function SetProxyKeyValue<M extends string, K extends string, V extends string>(material: M, key: K, value: V): void;

    function DestroyProxy<M extends string>(material: M): void;

    function CreateProxy<M extends string>(material: M): void;

    function Refresh<I extends number>(index: I): boolean;

    function SetKeyValue<I extends number, S extends string, V extends number>(index: I, shader: S, value: V): void;

    function Get<N extends string>(name: N): number;

    function Destroy<N extends string>(name: N): boolean;

    function Create<N extends string>(name: N): boolean;
}
// #endregion
// #region View
declare namespace View {
    function WorldToScreen<I extends number, P extends Vector3D>(index: I, point: P): Vector2D;

    function Render<I extends number, X extends number, Y extends number, W extends number, H extends number>(
        index: I,
        x: X,
        y: Y,
        width: W,
        height: H
    ): void;

    function Update<I extends number, W extends number, H extends number, O extends Vector3D, A extends Vector3D>(
        index: I,
        width: W,
        height: H,
        origin: O,
        angles: A
    ): void;

    function Create(): number;
}
// #endregion
// #region DataFile
declare namespace DataFile {
    function EraseKey<F extends string, K extends string>(filename: F, key: K): void;

    function GetKey<F extends string, K extends string, A extends string>(filename: F, key: K): A;

    function SetKey<F extends string, K extends string, V extends string>(filename: F, key: K, value: V): void;

    function Load<F extends string>(filename: F): void;

    function Save<F extends string>(filename: F): void;
}
// #endregion
// #endregion

/**
 * Сниппет для Onetap V4
 *
 * @author Mased
 *
 * ---
 * **Материалы:**
 * @see https://legacy.leodev.xyz
 * @see https://docs.onecrack.shop
 * @see https://gamesensical.gitbook.io/docs/developers/netprops
 * @see https://github.com/MasedMSD/MSDSquad
 * @see https://developer.valvesoftware.com/wiki/Main_Page
 * @see https://wiki.alliedmods.net/Counter-Strike:_Global_Offensive_Events
 * @see https://github.com/aprxl/onetap-ts-boilerplate
 * @see https://learn.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes
 * ---
 */
