export type FormProps = {
    title: string,
    footerMessage: string,
    onSubmit: (...args:any)=>void,
    route: string,
    error:string | null
}