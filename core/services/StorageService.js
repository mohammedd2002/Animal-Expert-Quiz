class StorageService {

    setItem(key, value) {

        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key) {

        return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
    }

    getNextIdForItem(key) {

        let data = this.getItem(key);
        if (data.length === 0) {
            return 1;
        } else {
            let dataIds = data.map(data => data.id);
            return Math.max(...dataIds) + 1;
        }
    }
}