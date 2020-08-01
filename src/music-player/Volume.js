import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import IconButton from '@material-ui/core/IconButton'
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

const Volume = ({ musicPlayer }) => {
  const classes = useStyles()
  const [volume, setVolume] = useState(musicPlayer.volume * 100 | 0)
  const [isMute, setIsMute] = useState(false)
  const lastVolume = useRef(volume)

  const handleChangeVolume = (_, value) => {
    musicPlayer.volume = value / 100
    setIsMute(false)
    setVolume(value)
  }

  const handleToggleMute = () => {
    if (!isMute) {
      musicPlayer.volume = 0
      lastVolume.current = volume
      setIsMute(true)
      setVolume(0)
    } else {
      musicPlayer.volume = lastVolume.current / 100
      setIsMute(false)
      setVolume(lastVolume.current)
    }
  }

  let VolumeIcon
  if (isMute) {
    VolumeIcon = VolumeOffIcon
  } else if (volume <= 33) {
    VolumeIcon = VolumeMuteIcon
  } else if (volume <= 66) {
    VolumeIcon = VolumeDownIcon
  } else {
    VolumeIcon = VolumeUpIcon
  }

  return (
    <>
      <Slider
        valueLabelDisplay='auto'
        value={volume}
        onChange={handleChangeVolume}
        className={classes.slider}
      />
      <IconButton onClick={handleToggleMute}>
        <VolumeIcon />
      </IconButton>
    </>
  )
}

if (typeof window !== 'undefined') {
  Volume.propTypes = {
    musicPlayer: PropTypes.instanceOf(window.Audio).isRequired
  }
}

export default Volume
