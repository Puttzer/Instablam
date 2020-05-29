

// Not needed? Come back to later!
function requestNotificationPermission() {
    Notification.requestPermission().then((response) => {
        console.log(response);
    });
}

function createNotification(arbiter) {
    const icon = '@/public/img/icons/Camera-rol-128.png';
    const play = arbiter.play;

    const notification = new Notification('New Pushnotification', { body: play, icon: icon });

    notification.addEventListener('click', () => {
        window.open('https://localhost:0443/');
    });
}

export { requestNotificationPermission, createNotification }