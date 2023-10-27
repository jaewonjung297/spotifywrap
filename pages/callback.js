import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css';
import { getCookie } from 'cookies-next';
import axios from 'axios';

export default function callback() {
    const [userData, setUserData] = useState(null);
    const [topArtists, setTopArtists] = useState(null);
    const [topSongs, setTopSongs] = useState(null);

    async function getTopArtists() {
        const accessToken = getCookie('access_token');
        const queryParams = new URLSearchParams();
        queryParams.append('time_range', 'long_term')

        if (accessToken) {
            axios.get('https://api.spotify.com/v1/me/top/artists', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                data: queryParams
            }).then((res) => {
                setTopArtists(res.data)
            })
            .catch((err) => console.error(err))
        }
    }
    async function getTopSongs() {
        const accessToken = getCookie('access_token');
        const queryParams = new URLSearchParams();
        queryParams.append('time_range', 'long_term')
        if (accessToken) {
            axios.get('https://api.spotify.com/v1/me/top/tracks', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                data: queryParams
            }).then((res) => {
                setTopSongs(res.data)
            }).catch((err) => console.error(err))
        }
    }

    useEffect(() => {
        //get access token from cookies
        const accessToken = getCookie('access_token');

        if (accessToken) {
            axios.get('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }).then((res) => {
                setUserData(res.data)
            }).catch((err) => {
                console.error(err);
            });
        }
    })
    return (
        <main>
            {userData && 
            <div>
                {userData.images[0] &&
                <img src = {userData.images[0].url}/>}
                <h1 className={styles.title}>
                    <span style = {{color: 'cyan'}}>{userData.display_name}</span>'s Spotify Profile
                </h1>
                <div>
                    Followers: {userData.followers.total}
                </div>
            </div>}

            
            {!topArtists &&
            <button onClick = {getTopArtists}>
                Get Top Artists
            </button>}
            {topArtists &&
            <div>
                {topArtists.items.map((item) => 
                <div key = {item.name}>
                    {item.name}. Popularity: {item.popularity}
                </div>)}
            </div>}
            {!topSongs &&
            <button onClick = {getTopSongs}>
                Get Top Songs
            </button>}
            {topSongs && 
            <div>
                {topSongs.items.map((item) => 
                <div key = {item.name}>
                    {item.name}
                </div>)}    
            </div>}

        </main>
    )
}
