export const setTheme = (theme) => ({
  type: 'theme.SET_THEME',
  payload: theme
})

export const setSearch = (search) => ({
  type: 'search.INPUT_SEARCH',
  payload: search
})

export const clearSearch = () => ({
  type: 'search.CLEAR'
})

export const setSearchOptions = (type, value) => ({
  type: 'searchOptions.' + type,
  payload: value
})

export const togglePlay = () => ({
  type: 'musicPlayer.TOGGLE_PLAY'
})

export const playSong = (file) => ({
  type: 'musicPlayer.PLAY_SONG',
  payload: file
})
