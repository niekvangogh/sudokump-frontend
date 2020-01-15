import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            stompClient: null,
            socket: null,
            connected: false,
            accessToken: null
        }
    },
    mounted() {

    },
    methods: {
        connect(callback) {
            if (this.stompClient && this.stompClient.connected) {
                callback(this.stompClient);
                return;
            }

            this.accessToken = this.$store.getters.accessToken;

            var accessToken = this.accessToken;
            XMLHttpRequest.prototype.origOpen = XMLHttpRequest.prototype.open;
            XMLHttpRequest.prototype.open = () => {
                this.origOpen.apply(this, arguments);
                this.setRequestHeader("Authorization", `Bearer ${accessToken}`);
            };


            this.socket = new SockJS("http://localhost:8080/ws");

            this.stompClient = Stomp.over(this.socket);
            console.log(this.accessToken);
            this.stompClient.connect(
                {
                    Authorization: `Bearer ${this.accessToken}`
                }, frame => {
                    console.log("success");

                    callback && callback(this.stompClient);
                    this.connected = true;
                },
                error => {
                    this.connected = false;
                    console.log("error");
                }
            );
        }
    }
}

