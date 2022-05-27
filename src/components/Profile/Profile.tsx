import { Hidden, Divider, Tabs, Tab, Typography } from '@mui/material';

import React, { useEffect } from 'react'
import { User } from '../../redux/feature/userSlice';
import ImageGallery from '../ImageGallery/ImageGallery';
import useStyles from "./style";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import { DocumentData } from 'firebase/firestore';
const Profile = ({user, isOwner} : {user: User | DocumentData, isOwner?: boolean}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
      <>
        <section className={classes.section}>
          <Hidden xsDown>
            <Divider />
          </Hidden>
          <Hidden xsDown>
              
            <Tabs
              value={value}
              onChange={(_, value) => setValue(value)}
              centered
              classes={{ indicator: classes.tabsIndicator }}
            >
              <Tab
                icon={<span className={classes.postsIconLarge} />}
                label="POSTS"
                classes={{
                  root: classes.tabRoot,
                  labelIcon: classes.tabLabelIcon,
                }}
              />
              {isOwner && (
                <Tab
                  icon={<span className={classes.savedIconLarge} />}
                  label="SAVED"
                  classes={{
                    root: classes.tabRoot,
                    labelIcon: classes.tabLabelIcon,
                  }}
                />
              )}
            </Tabs>
          </Hidden>
          <Hidden smUp>
            <Tabs
              value={value}
              onChange={(_, value) => setValue(value)}
              centered
              className={classes.tabs}
              classes={{ indicator: classes.tabsIndicator }}
            >
              <Tab
                icon={<GridViewOutlinedIcon fill={value === 0 ? "#3897f0" : undefined} />}
                classes={{ root: classes.tabRoot }}
              />
              {isOwner && (
                <Tab
                  icon={<BookmarkAddedOutlinedIcon fill={value === 1 ? "#3897f0" : undefined} />}
                  classes={{ root: classes.tabRoot }}
                />
              )}
            </Tabs>
          </Hidden>
          <Hidden smUp>{user.posts.length === 0 && <Divider />}</Hidden>
          {value === 0 && <ProfilePosts user={user} isOwner={isOwner} />}
          {value === 1 && <SavedPosts />}
        </section>
      </>
    );
  }
  
  function ProfilePosts({user, isOwner} : {user: User | DocumentData, isOwner?: boolean}) {
    const classes = useStyles();
  
    if (user.posts.length === 0) {
      return (
        <section className={classes.profilePostsSection}>
          <div className={classes.noContent}>
            <div className={classes.uploadPhotoIcon} />
            <Typography variant="h4">
              {isOwner ? "Upload a Photo" : "No Photos"}
            </Typography>
          </div>
        </section>
      );
    }
  
    return (
      <article className={classes.article}>
        <div className={classes.postContainer}>
            <ImageGallery _posts={user.posts} />
        </div>
      </article>
    );
  }
  
  function SavedPosts() {
    const classes = useStyles();
  
    return (
      <section className={classes.savedPostsSection}>
        <div className={classes.noContent}>
          <div className={classes.savePhotoIcon} />
          <Typography variant="h4">Save</Typography>
          <Typography align="center">
            Save photos and videos that you want to see again. No one is notified,
            and only you can see what youve saved.
          </Typography>
        </div>
      </section>
    );
  }

export default Profile