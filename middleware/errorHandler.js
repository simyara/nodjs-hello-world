module.exports = {
    createError:  function* (next) {
        try {
            yield next;
        } catch (err) {
            this.status = err.status || 500;
            this.body = this.body = {
                status: 'fail',
                data: {
                    error: err.message
                }
            };
            this.app.emit('error', err, this);
        }
    }
};