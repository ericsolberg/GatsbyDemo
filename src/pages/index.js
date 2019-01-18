import React, { Component } from "react"
import { StaticQuery, graphql } from "gatsby"
import CssBaseline from '@material-ui/core/CssBaseline'
import AppToolbar from '../components/AppToolbar'
import Card from "../components/Card"
import CardHeader from "../components/CardHeader"
import CardBody from "../components/CardBody"
import Info from "../components/Info"
import { withStyles } from '@material-ui/core/styles'

import styles from '../components/sectionCards'

class HomePage extends Component {

  render() {
    const { classes } = this.props
    return (<>
      <CssBaseline />
        <StaticQuery
          query={graphql`
            query HomePage {
              contentfulHomePage {
                title
                date
                content {
                  content
                  childMarkdownRemark {
                    html
                  }
                }
                image {
                  file {
                    url
                  }
                }
              }
            }
          `}
          render={({
            contentfulHomePage: {
              title,
              date,
              content: {
                childMarkdownRemark: { html }
              },
              image: {
                file: { url }
              }
            }
          }) => {
            return (<>
            <AppToolbar title='Gatsby PWA' />
            <div style={{marginTop: '105px', width: '100%'}}>
            <Card blog>
              <CardHeader image>
                <a href="/" onClick={e => e.preventDefault()}>
                  <img src={url} alt="..." />
                </a>
                <div
                  className={classes.coloredShadow}
                  style={{
                    backgroundImage: `url(${url})`,
                    opacity: "1"
                  }}
                />
              </CardHeader>
              <CardBody>
                <Info>
                  <h2 className={classes.cardCategory} style={{marginBottom: '0'}}>{title}</h2>
                </Info>
                <div className={classes.cardDescription} dangerouslySetInnerHTML={{ __html: html }} />
                <small>Created on {date}</small><br />
              </CardBody>
            </Card>
            </div>
          </>)}}
        />
    </>)
  }
}

export default withStyles(styles)(HomePage)