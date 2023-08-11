import { DatabaseReference } from "firebase/database";

export type UpcomingEventsProps = {
  reference: DatabaseReference;
  event_details:EventsProps
}[];

export type EventsProps = {
    event_name: string;
    event_desc: string;
    event_time: string;
    event_date: string;
}