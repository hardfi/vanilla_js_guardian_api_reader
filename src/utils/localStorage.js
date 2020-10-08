class LocalStorageService {
    constructor() {
        this.prefix = 'REC_TASK_';
    }
    get(key) {
        return localStorage.getItem(`${this.prefix}${key}`);
    }

    set(key, value) {
        localStorage.setItem(`${this.prefix}${key}`, value);
    }

    remove(key) {
        localStorage.removeItem(`${this.prefix}${key}`);
    }
}

export default new LocalStorageService();
