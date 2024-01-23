export type PartialUser = {
    id: string,
    username: string,
    avatar: string,
    public_flags: number,
    premium_type: number,
    flags: number, 
    banner: string,
    global_name: string,
    mfa_enable: boolean,
    email: string
}