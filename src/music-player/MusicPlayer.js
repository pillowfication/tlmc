import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AutoSizer from 'react-virtualized-auto-sizer'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Progress from './Progress'
import Controls from './Controls'
import Volume from './Volume'
import CoverImage from '../components/CoverImage'
import { nextSong } from '../redux/actions'
import { useForceUpdate, urlEncode, getAlbumInfo } from '../utils'

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: `1px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(1, 2)
  },
  coverImage: {
    flex: '0 0 auto'
  },
  interface: {
    flex: '1 1 0px'
  },
  autoSizer: {
    height: 'auto !important'
  }
}))

let musicPlayer = null // IDK why createRef isn't working

const MusicPlayer = connect(
  (state) => ({
    song: state.musicPlayer.playlist[state.musicPlayer.index]
  }),
  { nextSong }
)(
  ({ song, nextSong }) => {
    const classes = useStyles()
    const theme = useTheme()
    const forceUpdate = useForceUpdate()
    const albumInfo = getAlbumInfo(song)
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

    useEffect(() => {
      musicPlayer = new window.Audio()
      musicPlayer.volume = 0.4
      musicPlayer.addEventListener('ended', nextSong)

      const events = ['durationchange', 'ended', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause', 'play', 'playing', 'progress', 'seeked', 'seeking', 'timeupdate', 'volumechange']
      events.forEach((eventName) => {
        musicPlayer.addEventListener(eventName, forceUpdate)
      })

      return () => {
        musicPlayer.removeEventListener('ended', nextSong)
        events.forEach((eventName) => {
          musicPlayer.removeEventListener(eventName, forceUpdate)
        })
        musicPlayer.pause()
        musicPlayer = null
      }
    }, [])

    useEffect(() => {
      if (!song) return
      musicPlayer.src = `/api/tlmc${urlEncode(song.path)}`
      musicPlayer.play()
    }, [song])

    return (
      <div className={classes.root}>
        <Container>
          <Grid container spacing={2}>
            {!isSmall && (
              <Grid item className={classes.coverImage}>
                <CoverImage key={song.path} cueFile={song} size={125} />
              </Grid>
            )}
            <Grid item className={classes.interface}>
              <AutoSizer className={classes.autoSizer}>
                {({ width }) => (
                  <div style={{ width }}>
                    <Progress musicPlayer={musicPlayer} />
                    <Box textAlign='center' mt={isSmall ? 2 : 0} pt={0.5} pb={0.5}>
                      <Typography variant='h6' noWrap>
                        {song ? song.name : <i>No song selected</i>}
                      </Typography>
                      {albumInfo && (
                        <Typography variant='body2' noWrap>
                          {albumInfo.circleThing && `[${albumInfo.circleThing}]${String.fromCharCode(8193)}`}
                          {albumInfo.title}
                        </Typography>
                      )}
                    </Box>
                    {isSmall ? (
                      <Box textAlign='center'>
                        <Controls musicPlayer={musicPlayer} paused={musicPlayer.paused} />
                      </Box>
                    ) : (
                      <Grid container>
                        <Grid item xs />
                        <Grid item xs>
                          <Box textAlign='center'>
                            <Controls musicPlayer={musicPlayer} paused={musicPlayer.paused} />
                          </Box>
                        </Grid>
                        <Grid item xs>
                          <Box textAlign='right'>
                            <Volume musicPlayer={musicPlayer} volume={musicPlayer.volume} />
                          </Box>
                        </Grid>
                      </Grid>
                    )}
                  </div>
                )}
              </AutoSizer>
            </Grid>
          </Grid>
        </Container>
      </div>
    )
  }
)

export default MusicPlayer
