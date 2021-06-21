import { makeAutoObservable } from "mobx"

interface Modal {
    open: boolean;
    body: JSX.Element | null;
    size:  "mini" | "tiny" | "small" | "large" | "fullscreen" | undefined
}

export default class ModalStore {
    modal: Modal = {
        open: false,
        body: null,
        size: "small"
    }

    constructor() {
        makeAutoObservable(this)
    }

    openModal = (content: JSX.Element) => {
        this.modal.open = true;
        this.modal.body = content;
    }

    closeModal = () => {
        this.modal.open = false;
        this.modal.body = null;
    }
    setSize = (newsize: "mini" | "tiny" | "small" | "large" | "fullscreen" | undefined)=>{
        this.modal.size= newsize;
    }
}