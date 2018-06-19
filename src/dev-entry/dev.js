import '../assets/css/reset.css';
import '../assets/less/index.less';
import testMp4 from '../assets/video/test.mp4';
import testOgv from '../assets/video/test.ogv';
import testPoster from '../assets/img/test.jpg';
const ogv = require('ogv');
import enableInlineVideo from 'iphone-inline-video';
// import videojs from 'video.js';

let playing = false;
let r = null;

function addSourceToVideo(element, src, type) {
    const source = document.createElement('source');
    source.src = src;
    source.type = type;
    element.appendChild(source);
}

function activatePlayinline (domId) {
	const adiv = document.getElementById(domId);
	const shadowVideo = adiv.shadowRoot.querySelector('#shadow-video');
	enableInlineVideo(shadowVideo);
}

function playVideo (outSideElm) {
	outSideElm.shadowRoot.querySelector('#shadow-video').play();
}

function addPlayBtn (root) {
	const button = document.createElement('button');
	button.setAttribute('class', 'video-btn');
	button.setAttribute('onclick', 'videoPlay()');
	root.appendChild(button);
}

function addStyleToShadow (root) {
	const template = document.querySelector('.play-inline');
	root.appendChild(document.importNode(template.content, true));
}

function createShadowRoot (domId) {
	const adiv = document.getElementById(domId);
	let root = null;
	if (document.head.createShadowRoot || document.head.attachShadow) {
		try {
			root = adiv.attachShadow({mode: 'open'});
		} catch (e) {
			root = adiv.createShadowRoot();
		}
	} else {
		root = adiv;
	}
	return root;
}

function createShadowDom () {
    const root = createShadowRoot('video-content');
    // const root = adiv.attachShadow({mode: 'closed'});
    // const video = document.createElement('video');
    const video = document.createElement('video');
	video.setAttribute('id', 'shadow-video');
    video.setAttribute('class', 'shadow-video video-js');
    video.setAttribute('playsinline', 'isiPhoneShowPlaysinline');
    video.setAttribute('webkit-playsinline', 'isiPhoneShowPlaysinline');
    video.setAttribute('x-webkit-airplay', 'deny');
	video.setAttribute('data-setup', '{}');
	video.setAttribute('preload', 'true');
    video.setAttribute('muted', 'true');
	// video.setAttribute('data-role', 'txp_video_tag');
	video.setAttribute('poster', 'https://onegoods.nosdn.127.net/resupload/2018/5/28/64f7214860701e146fc9ffaa0f58662f.jpg');
    video.setAttribute('controls', '');
    video.setAttribute('webkitCurrentPlaybackTargetIsWireless', 'true');
	addStyleToShadow(root);
	root.appendChild(video);
	// addPlayBtn(root);
    addSourceToVideo(video, 'https://onegoods.nosdn.127.net/resupload/2018/04/09/e17e7a65f00d7e8173c0c3f88f2c9713.mp4', 'video/mp4');
    return root;
	// activatePlayinline('video-content');
	/*videojs(adiv.shadowRoot.querySelector('#shadow-video'), {}, function onPlayerReady() {
		videojs.log('Your player is ready!');
	});*/
}

function createRealDom () {
    const root = document.getElementById('wrapper');
    const video = document.createElement('video');
    video.setAttribute('id', 'shadow-video');
    video.setAttribute('class', 'shadow-video video-js');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('x-webkit-airplay', 'deny');
    video.setAttribute('preload', '');
    video.setAttribute('poster', testPoster);
    video.setAttribute('controls', 'true');
    root.appendChild(video);
    addSourceToVideo(video, testMp4, 'video/mp4');
    return root;
}

function addVideoPlayListr (root) {
    /*root.getElementById('shadow-video').addEventListener('touchstart', function (e) {
        root.getElementById('shadow-video').play();
        e.stopPropagation();
	}, false);*/
	root.getElementById('shadow-video').addEventListener('play', function () {
		playing = true;
		root.getElementById('shadow-video').removeAttribute('controls');
	});
}

function addVideoCloseListr(root) {
	document.getElementById('video-content').addEventListener('touchstart', () => {
		// const adiv = document.getElementById('video-content');
		// playVideo(adiv);
		if (playing) {
			playing = false;
			// root.getElementById('shadow-video').setAttribute('controls', '');
			root.getElementById('shadow-video').pause();
		}
	});
}

function init () {
	const root = createShadowDom();
	addVideoPlayListr(root);
	addVideoCloseListr(root);
    // console.log('---', document.getElementById('video-content').shadowRoot.getElementById('shadow-video').webkitSetMediaKeys)
    /*console.log('---', document.getElementById('video-content').shadowRoot.getElementById('shadow-video').host);*/
}



/*document.body.onload = function () {
	init();
    if (document.getElementById('video-content').shadowRoot.getElementById('shadow-video').webkitSupportsPresentationMode && typeof document.getElementById('video-content').shadowRoot.getElementById('shadow-video').webkitSetPresentationMode === "function") {
        document.getElementById('video-btn').addEventListener('click', (event) => {
            document.getElementById('video-content').shadowRoot.getElementById('shadow-video').webkitSetPresentationMode(document.getElementById('video-content').shadowRoot.getElementById('shadow-video').webkitPresentationMode === 'picture-in-picture' ? 'inline' : 'picture-in-picture');
            document.getElementById('video-content').shadowRoot.getElementById('shadow-video').play();
        });
	}
};*/

/*
document.body.onload = function () {
    if (window.WebKitPlaybackTargetAvailabilityEvent) {
        document.getElementById('shadow-video').addEventListener('webkitplaybacktargetavailabilitychanged', (event) => {
            switch (event.availability) {
                case "available": /!* turn stuff on *!/
                    // alert("available");
                    break;
                case "not-available": /!* turn AirPlay button off *!/
                    // alert("not-available");
                    break;
            }
        });
    }
    if (document.getElementById('shadow-video').webkitSupportsPresentationMode && typeof document.getElementById('shadow-video').webkitSetPresentationMode === "function") {
        document.getElementById('video-btn').addEventListener('click', (event) => {
            document.getElementById('shadow-video').webkitSetPresentationMode(document.getElementById('shadow-video').webkitPresentationMode === 'picture-in-picture' ? 'inline' : 'picture-in-picture');
            document.getElementById('shadow-video').play();
        });

    }
    document.getElementById('video-btn').addEventListener('click', (event) => {
        document.getElementById('shadow-video').play();
    });
};
*/

document.body.onload = function () {
    ogv.OGVLoader.base = '/ogv/dist';
    const player = new ogv.OGVPlayer();

    const containerElement = document.getElementById('wrapper');
    containerElement.appendChild(player);
    player.src = testOgv;
    player.poster = 'https://onegoods.nosdn.127.net/resupload/2018/5/28/64f7214860701e146fc9ffaa0f58662f.jpg';
    player.controls = true;
    player.width = '375';
    document.getElementById('video-btn').addEventListener('click', () => {
        player.play();
	});
    // player.play();
};

/*import Chimee from 'chimee';
const chimee = new Chimee({
    wrapper: '#wrapper',
    src: 'https://onegoods.nosdn.127.net/resupload/2018/04/09/e17e7a65f00d7e8173c0c3f88f2c9713.mp4',
    playsInline: true,
    xWebkitAirplay: true,
    poster: 'https://onegoods.nosdn.127.net/resupload/2018/5/28/64f7214860701e146fc9ffaa0f58662f.jpg',
    controls: false,
    autoplay: true
});
chimee.on('play', () => console.log('play!!'));
// chimee.load('https://onegoods.nosdn.127.net/resupload/2018/04/09/e17e7a65f00d7e8173c0c3f88f2c9713.mp4');
chimee.play(); // play!!*/
