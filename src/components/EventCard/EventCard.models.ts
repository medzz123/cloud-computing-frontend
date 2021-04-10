export interface EventCardProps {
  image: string;
  location: string;
  title: string;
  name: string;
  date: string;
  start: string;
  end: string;
  description?: string;
  guests?: {
    email: string;
    attending: boolean;
    replied: boolean;
  }[];
  customComponent?: React.ReactNode;
}
