import Vue from 'vue';
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default function ({ store }, inject) {
    const manager = {};

    manager.stompClient = null;
    manager.socket = null;;
    manager.connected = false;
    manager.registerCallbacks = [];


    manager.registerConnect = (callback) => {
        if (manager.stompClient && manager.stompClient.connected) {
            callback && callback(manager.stompClient);
            return;
        }
        manager.registerCallbacks.push(callback);
    }

    manager.connect = (callback) => {
        const accessToken = store.getters.accessToken;
        console.log(accessToken)

        XMLHttpRequest.prototype.origOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function () {
            this.origOpen.apply(this, arguments);
            this.setRequestHeader("Authorization", `Bearer ${accessToken}`);
        };

        manager.socket = new SockJS("http://localhost:8080/ws");
        manager.stompClient = Stomp.over(manager.socket);

        manager.stompClient.connect(
            {
                Authorization: `Bearer ${accessToken}`
            },
            frame => {
                manager.registerCallbacks.forEach((registerCallback) => {
                    registerCallback && registerCallback(manager.stompClient);
                })
                callback && callback(manager.stompClient);
            },
            error => {
                console.log(error);
            }
        );
    };

    inject("socketManager", manager);
}
