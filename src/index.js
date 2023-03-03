import FullScreenVideo from './components';
import React from 'react'; // eslint-disable-line
import styled from 'styled-components';
import { createRoot } from 'react-dom/client';
import './App.css';

const reactRootId = 'root';
const container = document.getElementById(reactRootId);
const root = createRoot(container);

const mocks = [
  {
    size: 720,
    videoUrl: [
      'https://storage.googleapis.com/mirrormedia-files/assets/videos/20170311201320-ef8de05c18e60e249483282db2c53846.mp4',
    ],
  },
  {
    size: 960,
    videoUrl: [
      'https://storage.googleapis.com/mirrormedia-files/assets/videos/20161202181537-3a2546dcc005b701eaf53b479a9cc639.mp4',
    ],
  },
  {
    size: 1280,
    videoUrl: [
      'https://storage.googleapis.com/mirrormedia-files/assets/videos/20161130152804-8eea0023e1ea73ebc91a14d68c552950.mp4',
    ],
  },
  {
    size: 1440,
    videoUrl: [
      'https://ff12c8f8eb5b06fea474fa59905947309e6103525798f8805fe25c0-apidata.googleusercontent.com/download/storage/v1/b/mirrormedia-files/o/assets%2Fvideos%2F20161130153030-2cc6fa313cad0949163fe58b2cf2d2fb.mp4?jk=AahUMluKph_z-po7OKOzp503yCYf2IlvsJdPpdSOz1j48BdVSoekmqVqsmaCwOTSEQmkYLuEtq5lMB1lI-Mgw2bQJC8a5RSaW8M80s145iOlBZdGngzSHOiyOrLfum0rhff7iFdGdjkWzFv3feBLRzqt2ctXvv1nzBYGfFstJXl3M75XrWvE5g3-isjoFQoXUS1_l_in81EcC3lhPnkYlxvqwryE1HqV7gFQ5dCJ7KHAZlRItFxuLsoE3_6ORdNTY-N9qf5wLslKsJnbxOGaz9v1zPeV77mnvxlNKW5cvvZavsRXZGf5OGF6po8XW2RF9s7-Nu1TrmeO8c5kwm1IoNO7W5QndsqqtZdak5bJIo8UBzeSXmGl5Hk2uheO0WDdPxohCrwoRUocdVgRR-dxn__UgB7GZs3ff1ynvKZDWaajDXbNy7A_wWEmqhystY8FLOUDlbNp-QADRWHsuzGZ8mP2yDRepXIkHLe3PBSU-5_iRyW-nN-btOMVoNxaESsfLzIip4YALtMTga0RbHvqV34lkXCyPv0EVTRU1r2vD3VE6TzPE6sq85pGSZiVu0SmeNVGAjOy4WY8ZhGufzfNSxG-wqbP5966xsh1TY0b4ccu_az2PNxdRh9TCNjWf40IPV9e5NZFssRuipJGcXFMwCImg58YjcvnxyloTZ8SSHHBzdiFVP-1fONXxwH1FmPxMEIuddt-iZXKc01BenI09Hv3MwVxEKWjUEcmzcEA1U7mrTIiDgrEtCq9lgk3h0mgbWDDghfajFBU0sZEdOX1H0XHLNDu4jssDpZmD8bJaC22h3q4pzXLz9Vel9GriPQ-AdmJaQIPhc2Ol9890Rl8rav5AlbSPHvN5jkTPzIkqiV0q6MDKgGcvswCDgrompB4H8LWgf-uRrrFICqH_PwIKN7rQcMjT70W-a9OqyRZNB2OZgLLO5pnPKPOPX6txB26AFxHZoSue6RSrp-5na4ljTQNNOBOo6dRGn3SXt8NlXXaHj61P7lNlZVPdJ0b-2rC9J6-gHCLcm_uwlqQZBSqPIm69XpMCI-0VIjuvF3QT5eJuF6gkzZ8cLzSJk20o0ZiEPIeeiqsGqgzehXW4smUnd2o7JQa9tFA_VwGLUG5HZwIxbg3AMU70VQmUO1lL-T7Mu86wRvUHTuyY43zoEKx9XqZGXqoQG4K9uEvJv_hzvSkGG_yBg1nIAl_Y_RbZX-i4TMpRTfTZgvVgosOGMTiSE6Dx4hH4HSzP3fIxI9I1kY2OOAn3RGYL-Rzw0mmdRRmuCMVTZ8J3FOMs2eCOQ&isca=1',
    ],
  },

  {
    size: 1920,
    videoUrl: [
      'https://storage.googleapis.com/mirrormedia-files/assets/videos/20161215181046-3a41eaef0d8764379de19302e322a3bc.mp4',
    ],
  },
];

const MockContentBlock = styled.div`
  height: 100vh;
  background-color: pink;
`;

root.render(
  <div>
    <MockContentBlock />
    <FullScreenVideo muteHint={false} videoUrls={mocks} />
  </div>
);
