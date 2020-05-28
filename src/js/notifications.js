

// Not needed? Come back to later!
function requestNotificationPermission() {
    Notification.requestPermission().then((response) => {
        console.log(response);
    });
}

function createNotification(arbiter) {
    const icon = 'images/icons/shakespeare-apple-touch-icon.png';
    const play = arbiter.play;

    const notification = new Notification('New Pushnotification', { body: play, icon: icon });

    notification.addEventListener('click', () => {
        window.open('https://localhost:0443/');
    });
}

export { requestNotificationPermission, createNotification }