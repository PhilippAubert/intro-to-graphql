import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";

import { useQuery, gql } from "./api";
import { apis } from "./const";
import { useState } from "react";

export function Launches() {
  const [launchesLimit, setLaunchesLimit] = useState(6);

  const { data } = useQuery(
    gql`
      query ($launchesLimit: Int) {
        launchesPast(limit: $launchesLimit) {
          id
          mission_name
          rocket {
            rocket_name
          }
          launch_site {
            site_name_long
          }
          launch_date_local
          links {
            flickr_images
          }
        }
      }
    `,
    { endpoint: apis.spaceX, variables: { launchesLimit } }
  );

  console.log(data);

  return (
    <>
      <Grid container spacing={3}>
        {data?.launchesPast.map(
          ({
            id,
            mission_name,
            launch_date_local,
            launch_site,
            rocket,
            links,
          }) => (
            <Grid item md={6} lg={4}>
              <Card>
                <CardMedia
                  style={{
                    height: 250,
                    backgroundColor: "lightgray",
                  }}
                  image={links.flickr_images?.[0]}
                  title={null}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {mission_name}
                  </Typography>
                  <Typography variant="body2">
                    {rocket.rocket_name} launched {launch_date_local} from (""){" "}
                    {launch_site.site_name_long}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>
      <Box py={5}>
        <Button
          size="medium"
          variant="contained"
          onClick={() => {
            setLaunchesLimit(launchesLimit + 6);
          }}
        >
          {"Load more"}
        </Button>
      </Box>
    </>
  );
}
