import React, { memo, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import VolumeOffIcon from '@material-ui/icons/VolumeOff'
import VolumeMuteIcon from '@material-ui/icons/VolumeMute'
import VolumeDownIcon from '@material-ui/icons/VolumeDown'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'

const useStyles = makeStyles((theme) => ({
  slider: {
    position: 'relative',
    top: 10,
    width: 100
  }
}))

const Volume = memo(({ musicPlayer, volume }) => {
  const classes = useStyles()
  const [isMute, setIsMute] = useState(false)
  const lastVolume = useRef(volume)

  const handleChangeVolume = (_, value) => {
    musicPlayer.volume = value / 100
    setIsMute(false)
  }

  const handleToggleMute = () => {
    if (!isMute) {
      musicPlayer.volume = 0
      lastVolume.current = volume
      setIsMute(true)
    } else {
      musicPlayer.volume = lastVolume.current
      setIsMute(false)
    }
  }

  let VolumeIcon
  if (isMute) {
    VolumeIcon = VolumeOffIcon
  } else if (volume < 1 / 3) {
    VolumeIcon = VolumeMuteIcon
  } else if (volume < 2 / 3) {
    VolumeIcon = VolumeDownIcon
  } else {
    VolumeIcon = VolumeUpIcon
  }

  return (
    <>
      <Slider
        valueLabelDisplay='auto'
        value={volume * 100 | 0}
        onChange={handleChangeVolume}
        className={classes.slider}
      />
      <Tooltip title={isMute ? 'Unmute' : 'Mute'}>
        <IconButton onClick={handleToggleMute}>
          <VolumeIcon />
        </IconButton>
      </Tooltip>
    </>
  )
})

if (typeof window !== 'undefined') {
  Volume.propTypes = {
    musicPlayer: PropTypes.instanceOf(window.Audio).isRequired
  }
}

export default Volume
