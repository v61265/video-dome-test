import React /* eslint-disable-line */, {
  useEffect,
  useRef,
  useState,
} from 'react';
import breakpoint from './breakpoint';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import useMuted from '../hooks/useMuted';

/**
 * @type {import('./typedef').KaraokeStyles}
 */
const defaultStyles = {
  mobile: {
    background: {
      color: '#fff',
    },
    font: {
      color: 'rgba(0,0,0,40%)',
      size: '16px',
      weight: '700',
    },
    lineHeight: '180%',
    textAlign: 'center',
    transitioned: {
      font: {
        color: '#000',
      },
    },
    image: {
      width: 'auto',
      height: 'auto',
      position: 'left',
    },
  },
  tablet: {
    background: {
      color: '#fff',
    },
    font: {
      color: 'rgba(0,0,0,40%)',
      size: '28px',
      weight: '700',
    },
    lineHeight: '180%',
    textAlign: 'center',
    transitioned: {
      font: {
        color: '#000',
      },
    },
    image: {
      width: 'auto',
      height: 'auto',
      position: 'left',
    },
  },
};

/**
 *  @param {Object} opts
 *  @param {import('./typedef').KaraokeStyles} [opts.styles]
 *  @param {string} [opts.className]
 *  @param {string} [opts.preload='auto'] - 'auto', 'none' or 'metadata'. `preload` attribute of `video` tag.
 *  @param {boolean} [opts.muteHint=false] - if true, there is another full page to hint how to mute/unmute video.
 *  @param {Object[]} [opts.videoUrl]
 */
export default function VideoItem({
  preload = 'auto',
  styles = defaultStyles,
  videoUrl,
}) {
  const defaultDuration = 10; // second
  const videoRef = useRef(null);
  const [muted, setMuted] = useMuted(false);
  const [containerRef, inView] = useInView({
    threshold: [0.6],
  });

  const [videoOpts, setVideoOpts] = useState({
    paused: !inView,
    duration: defaultDuration,
    currentTime: 0,
    notice: '',
  });

  useEffect(() => {
    const video = videoRef.current;
    const onLoadedMetadata = () => {
      setVideoOpts((opts) => {
        return Object.assign({}, opts, {
          duration: video.duration || defaultDuration,
        });
      });
    };

    if (video) {
      video.addEventListener('loadedmetadata', onLoadedMetadata);
    }

    // clear event listeners
    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    // set video muted attribute according to browser muted state
    video.muted = false;
  }, [muted]);

  useEffect(
    () => {
      const video = videoRef.current;
      if (!video) {
        return;
      }
      // video.muted = false
      console.log('here change');
      // in the viewport
      if (inView) {
        // start with `videoOpts.currentTime` to catch up `QuoteShadow` animation
        video.currentTime = videoOpts.currentTime;
        const startPlayPromise = video.play();
        startPlayPromise
          // play successfully
          .then(() => {
            setVideoOpts((opts) =>
              Object.assign({}, opts, {
                // clear notice
                notice: '',
              })
            );
          })
          // fail to play
          .catch((error) => {
            console.log(error);
            // browser prevent from playing video before user interactions
            if (error.name === 'NotAllowedError') {
              setVideoOpts((opts) =>
                Object.assign({}, opts, {
                  notice: '請點選聲音播放鍵',
                })
              );
            } else {
              setVideoOpts((opts) =>
                Object.assign({}, opts, {
                  notice: '無法播放音檔，請重新整理頁面',
                })
              );
            }
          });
      } else {
        // leave the viewport
        video.pause();
      }
      setVideoOpts((opts) =>
        Object.assign({}, opts, {
          paused: !inView,
        })
      );
    },
    // `inView` is used to avoid from infinite re-rendering.
    // `muted` is avoid state not changed due to closure.
    [inView]
  );

  return (
    <VideoContainer ref={containerRef} styles={styles}>
      <video
        ref={videoRef}
        preload={preload}
        data-readr-full-screen-video
        data-played={true}
        controls
        muted
      >
        <source key={`video_source`} src={videoUrl}></source>
      </video>
    </VideoContainer>
  );
}

const AudioBt = styled.div`
  cursor: pointer;
`;

const Text = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 180%;
  text-align: center;
  color: #000;

  @media ${breakpoint.devices.tablet} {
    font-size: 20px;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  video {
    width: 100%;
  }

  background-color: ${
    /**
     *  @param {Object} props
     *  @param {import('./typedef').KaraokeStyles} props.styles
     */
    (props) => props.styles.mobile.background.color
  };

  @media ${breakpoint.devices.tablet} {
    flex-direction: row;
  }

  ${AudioBt} {
    left: 12px;
    bottom: 12px;
    position: absolute;
    cursor: pointer;

    @media ${breakpoint.devices.tablet} {
      left: 27px;
      bottom: 22px;
    }
  }
`;
