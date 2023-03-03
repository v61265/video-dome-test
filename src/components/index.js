import React /* eslint-disable-line */, { useMemo, useState } from 'react';
import breakpoint from './breakpoint';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import useWindowSize from '../hooks/useViewport';
import useMuted from '../hooks/useMuted';
import VideoItem from './video-item';

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
 *  @param {Object[]} [opts.videoUrls]
 */
export default function FullScreenVideo({
  className,
  preload = 'auto',
  styles = defaultStyles,
  muteHint = false,
  videoUrls,
}) {
  const viewport = useWindowSize();
  const defaultDuration = 10; // second
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

  const videoFitWidthIndex = useMemo(() => {
    const widthMultipliedByDpr = viewport.width * viewport.dpr;
    let index;
    for (let i = 0; i < videoUrls.length; i++) {
      if (videoUrls[i].size > widthMultipliedByDpr) {
        index = i;
        break;
      }
    }
    if (!index) {
      index = videoUrls.length;
    }
    return index;
  }, [viewport]);

  return (
    <>
      {muteHint && (
        <HintContainer>
          <Text>
            此新聞專題網頁包含聲音，點擊<b>開啟</b>
          </Text>
        </HintContainer>
      )}
      {videoFitWidthIndex}
      {videoUrls.map((video, index) => {
        return (
          <section key={`video_source_${index}`}>
            {index === videoFitWidthIndex - 1 && (
              <VideoItem videoUrl={video.videoUrl} />
            )}
          </section>
        );
      })}
    </>
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

const HintContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #fff;

  ${AudioBt} {
    margin-bottom: 10px;
    & path {
      fill: #000;
    }
  }
`;
