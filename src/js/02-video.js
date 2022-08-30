import Player from '@vimeo/player';
import { throttle } from 'lodash';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlayerTimeupdate, 1000));

player
.setCurrentTime(localStorage.getItem('videoplayer-current-time'))
.catch(function (error) {
    switch (error.name) {
        case 'RangeError':
            console.log('The time was less than 0 or greater than the video`s duration')
            break;

        default:
            console.log('Some other error occurred')
            break;
    }
});

function onPlayerTimeupdate(data) {
    localStorage.setItem('videoplayer-current-time', data.seconds);
}