import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export const socketMixin = {
    data() {
        return {
            stompClient: null,
            socket: null,
        }
    },
    methods: {
        connect(callback) {
            if (this.stompClient && this.stompClient.connected) {
                callback && callback(this.stompClient);
                return;
            }

            const accessToken = this.$store.getters.accessToken;

            XMLHttpRequest.prototype.origOpen = XMLHttpRequest.prototype.open;
            XMLHttpRequest.prototype.open = function () {
                this.origOpen.apply(this, arguments);
                this.setRequestHeader("Authorization", `Bearer ${accessToken}`);
            };

            var socket = new SockJS("http://localhost:8080/ws");

            this.stompClient = Stomp.over(socket);
            this.stompClient.connect(
                {
                    Authorization: `Bearer ${accessToken}`
                },
                frame => {
                    callback && callback(this.stompClient)
                },
                error => {
                    console.log(error);
                }
            );
        }
    }, mounted() {
        this.connect((stompClient) => {
            console.log("fuck");
        });
    }
}

