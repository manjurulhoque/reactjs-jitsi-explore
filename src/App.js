import React, { useState } from 'react'

import { Jutsu, useJitsi } from 'react-jutsu'

const App = () => {
    const [room, setRoom] = useState('')
    const [name, setName] = useState('')
    const [call, setCall] = useState(false)

    const jitsiConfig = {
        roomName: room,
        displayName: name,
        parentNode: 'jitsi-container',
        width: '100%',
        height: '100%',
        interfaceConfigOverwrite: {
            BRAND_WATERMARK_LINK: 'https://stcvit.in/',
            TOOLBAR_BUTTONS: [
                'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
                'etherpad', 'settings', 'raisehand'
                , 'filmstrip', 'shortcuts',
                'tileview', 'download', 'security',
            ],
            SHOW_CHROME_EXTENSION_BANNER: false,
            SETTINGS_SECTIONS: ['devices', 'language', 'moderator', 'profile', 'calendar'],
            SHOW_BRAND_WATERMARK: false,
            SHOW_DEEP_LINKING_IMAGE: false,
            SHOW_JITSI_WATERMARK: true,
            SHOW_POWERED_BY: false,
            SHOW_PROMOTIONAL_CLOSE_PAGE: false,
        }
    }

    const { error, loading, jitsi } = useJitsi(jitsiConfig);

    const handleClick = event => {
        event.preventDefault()
        if (room && name) setCall(true)
    }

    // return (
    //     <>
    //         {error && <h2>error</h2>}
    //         <div style={{ width: '100%', height: '100vh' }}>
    //             <div id={jitsiConfig.parentNode} style={{ width: '90vw', height: '90vh' }}>
    //             </div>
    //             <button style={{ height: '7vh', width: '8vw' }}>End Meet</button>
    //         </div>

    //     </>
    // )

    return call ? (
        <Jutsu
            roomName={room}
            userName={name}
            width={jitsiConfig.width}
            height={jitsiConfig.height}
            interfaceConfigOverwrite={jitsiConfig.interfaceConfigOverwrite}
            containerStyles={{ width: '1200px', height: '800px' }}
            frameStyle={{ display: 'block', width: '100%', height: '100%' }}
            userInfo={
                {
                    displayName: 'Rumi',
                    avatar: 'https://www.gravatar.com/avatar/09abd59eb5653a7183ba812b8261f483',
                    email: 'rumi@gmail.com',
                }
            }
            loadingComponent={<p>loading ...</p>} />
    ) : (
        <div className="container">
            <div className="row">
                <form className="form-inline mt-3">
                    <div className="form-group">
                        <input id='room' className="form-control" type='text' placeholder='Room' value={room} onChange={(e) => setRoom(e.target.value)} />
                        <input id='name' className="form-control" type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <button onClick={handleClick} type='submit' className="btn btn-primary">
                        Start / Join
                    </button>
                </form>
            </div>
        </div>
    )
}

export default App