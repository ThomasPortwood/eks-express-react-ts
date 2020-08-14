import * as React from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  createStyles,
  Divider,
  Theme,
  Typography
} from "@material-ui/core";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
    propertyCard: {
      minWidth: 500
    },
    propertyCardTitle: {
      fontSize: 12
    },
    avatar: {
      // backgroundColor: red[500],
    },
  }),
);

export const PropertyCard = ({property}: any) => {

  const classes = useStyles();

  const interval = moment(property.updatedAt).toNow(true);

  return (
    <Card elevation={5} className={classes.propertyCard}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {property.name[0]}
          </Avatar>
        }
        title={property.name}
        subheader={`Updated ${interval} ago`}
      />
      <CardContent>
        <Typography>
          {property.address}
        </Typography>
      </CardContent>
      <Divider light={true}/>
      <CardActions>
        <Button size="small" className={classes.propertyCardTitle}>
          <Link to={`/properties/${property.id}`}>
            <Typography className={classes.propertyCardTitle}>
              Settings
            </Typography>
          </Link>
        </Button>
      </CardActions>
    </Card>
  )
};