import Toaster from 'v-toaster';


const Notificator = {
    install(Vue, options) {
        Vue.use(Toaster, {timeout: 5000});
        Vue.prototype.$notificator = function (type, message) {
            switch (type) {
                case 'info': this.$toaster.info(message);
                    break;
                case 'success': this.$toaster.success(message);
                    break;
                case 'warning': this.$toaster.warning(message);
                    break;
                case 'error': this.$toaster.error(message);
                    break;
                default: this.$toaster.warning(message);
                    break;
            }
        }
    }
};

export default Notificator;
