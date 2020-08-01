import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import { togglePlay, previousSong, nextSong } from '../redux/actions'

const useStyles = makeStyles((theme) => ({
  controls: {
    whiteSpace: 'nowrap'
  }
}))

const Controls = connect(
  (state) => ({
    index: state.musicPlayer.index,
    playing: state.musicPlayer.playing
  }),
  { togglePlay, previousSong, nextSong }
)(
  ({ musicPlayer, index, playing, togglePlay, previousSong, nextSong }) => {
    const classes = useStyles()

    const handleClickPlay = () => {
      if (playing) {
        musicPlayer.pause()
      } else {
        musicPlayer.play()
      }
      togglePlay()
    }

    const handleClickPrevious = () => {
      if (index === 0 || musicPlayer.currentTime > 5) {
        musicPlayer.currentTime = 0
      } else {
        previousSong()
      }
    }

    const handleClickNext = nextSong

    return (
      <div className={classes.controls}>
        <IconButton onClick={handleClickPrevious}>
          <SkipPreviousIcon />
        </IconButton>
        <IconButton onClick={handleClickPlay}>
          {playing ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <IconButton onClick={handleClickNext}>
          <SkipNextIcon />
        </IconButton>
      </div>
    )
  }
)

if (typeof window !== 'undefined') {
  Controls.propTypes = {
    musicPlayer: PropTypes.instanceOf(window.Audio).isRequired
  }
}

export default Controls
