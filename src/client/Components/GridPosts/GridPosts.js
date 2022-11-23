import React from "react";
import {
  Grid,
  Image,
  Card,
  Icon,
  Feed,
  Comment,
  Form,
  Button,
  Embed,
} from "semantic-ui-react";
import "../GridPosts/GridPosts.css";

const imageSrc = "https://react.semantic-ui.com/images/wireframe/image.png";

const GridPosts = () => (
  <Grid stackable columns={3} className="mt3">
    <Grid.Column>
      <Card>
        <iframe
          className="iframeaddin"
          src="https://www.youtube.com/embed/O6Xo21L0ybE"
          title="YouTube video"
          allowFullScreen
          frameBorder="0"
        ></iframe>
        {/* <Embed brandedUI id="O6Xo21L0ybE" source="youtube" /> */}
        <Card.Content>
          <Feed>
            <Feed.Event>
              <Feed.Content>
                <Feed.Date>3 days ago</Feed.Date>
                <Feed.Summary>
                  <a>Laura Faucet</a> created a post
                </Feed.Summary>
                <Feed.Extra text className="postcaption">
                  Have you seen what's going on in Israel? Can you believe it.
                </Feed.Extra>
              </Feed.Content>
            </Feed.Event>
          </Feed>
          <Comment.Group>
            <Comment>
              <Comment.Content>
                <Comment.Author>Joe Henderson</Comment.Author>
                <Comment.Text>
                  <span>
                    The hours, minutes and seconds stand as visible reminders
                    that your effort put them all there.
                  </span>
                </Comment.Text>
              </Comment.Content>
            </Comment>

            <Comment>
              <Comment.Content>
                <Comment.Author>Christian Rocha</Comment.Author>

                <Comment.Text>I re-tweeted this.</Comment.Text>
              </Comment.Content>
            </Comment>

            <Form>
              <Form.TextArea rows={1} />
              <Button size="small" content="Post" primary />
            </Form>
          </Comment.Group>
        </Card.Content>
      </Card>
    </Grid.Column>
    <Grid.Column>
      <Card>
        <iframe
          className="iframeaddin"
          src="https://www.youtube.com/embed/O6Xo21L0ybE"
          title="YouTube video"
          allowFullScreen
          frameBorder="0"
        ></iframe>
        {/* <Embed brandedUI id="O6Xo21L0ybE" source="youtube" /> */}
        <Card.Content>
          <Feed>
            <Feed.Event>
              <Feed.Content>
                <Feed.Date>3 days ago</Feed.Date>
                <Feed.Summary>
                  <a>Laura Faucet</a> created a post
                </Feed.Summary>
                <Feed.Extra text className="postcaption">
                  Have you seen what's going on in Israel? Can you believe it.
                </Feed.Extra>
              </Feed.Content>
            </Feed.Event>
          </Feed>
          <Comment.Group>
            <Comment>
              <Comment.Content>
                <Comment.Author>Joe Henderson</Comment.Author>
                <Comment.Text>
                  <span>
                    The hours, minutes and seconds stand as visible reminders
                    that your effort put them all there.
                  </span>
                </Comment.Text>
              </Comment.Content>
            </Comment>

            <Comment>
              <Comment.Content>
                <Comment.Author>Christian Rocha</Comment.Author>

                <Comment.Text>I re-tweeted this.</Comment.Text>
              </Comment.Content>
            </Comment>

            <Form>
              <Form.TextArea rows={1} />
              <Button size="small" content="Post" primary />
            </Form>
          </Comment.Group>
        </Card.Content>
      </Card>
    </Grid.Column>
    <Grid.Column>
      <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
    </Grid.Column>
    <Grid.Row columns={4}>
      <Grid.Column>
        <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
      </Grid.Column>
      <Grid.Column>
        <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
      </Grid.Column>
      <Grid.Column>
        <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
      </Grid.Column>
      <Grid.Column>
        <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
      </Grid.Column>
    </Grid.Row>
    <Grid.Column>
      <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
    </Grid.Column>
    <Grid.Column>
      <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
    </Grid.Column>
    <Grid.Column>
      <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
    </Grid.Column>
  </Grid>
);

export default GridPosts;
