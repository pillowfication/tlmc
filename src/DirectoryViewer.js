import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Directory } from 'ls-serialize/src/structures'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import DirectoryViewerVirtualized from './DirectoryViewerVirtualized'
import FileIcon from './FileIcon'
import Link from './Link'

const useStyles = makeStyles((theme) => ({
  list: {
    padding: theme.spacing(1, 0, 20)
  },
  listItem: {
    padding: theme.spacing(0.5, 4)
  },
  listIcon: {
    color: 'inherit'
  }
}))

const DirectoryViewer = ({ directory }) => {
  if (directory.isRoot) {
    return (
      <DirectoryViewerVirtualized
        directory={directory}
        filter={(file) => file instanceof Directory}
      />
    )
  }

  const files = [...directory.files]
  const classes = useStyles()

  return (
    <List className={classes.list}>
      {files.map((file, index) =>
        <Link key={index} href='/tlmc/[...tlmc_path]' as={'/tlmc' + file.path}>
          <ListItem button className={classes.listItem}>
            <ListItemIcon className={classes.listIcon}><FileIcon file={file} /></ListItemIcon>
            <ListItemText><Typography>{file.base}</Typography></ListItemText>
          </ListItem>
        </Link>)}
    </List>
  )
}

export default DirectoryViewer
