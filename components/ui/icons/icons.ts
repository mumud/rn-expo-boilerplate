/**
 * Icons collection - Centralized icon management
 * Menggunakan pendekatan yang lebih clean dengan satu file untuk semua ikon
 */

import {
  // Auth related icons
  LogIn,
  Eye,
  EyeOff,

  // UI icons
  Bell,
  Search,
  SlidersHorizontal,

  // Theme icons
  Sun,
  MoonStar,

  // Navigation icons
  ArrowLeft,
  ArrowRight,

  // User & Profile icons
  User,
  UserPlus,

  // Communication icons
  Mail,

  // Status & Feedback icons
  AlertCircle,
  CheckCircle,
  HelpCircle,

  // Action icons
  RefreshCcw,
  Settings,
  CreditCard,

  // Time & Calendar icons
  Calendar,
  Clock,

  // Data & Analytics icons
  TrendingUp,
  Star,
} from "lucide-react-native";

import { iconWithClassName } from "./iconWithClassName";

// Apply className support to all icons
const icons = {
  // Auth related icons
  LogIn,
  Eye,
  EyeOff,

  // UI icons
  Bell,
  Search,
  SlidersHorizontal,

  // Theme icons
  Sun,
  MoonStar,

  // Navigation icons
  ArrowLeft,
  ArrowRight,

  // User & Profile icons
  User,
  UserPlus,

  // Communication icons
  Mail,

  // Status & Feedback icons
  AlertCircle,
  CheckCircle,
  HelpCircle,

  // Action icons
  RefreshCcw,
  Settings,
  CreditCard,

  // Time & Calendar icons
  Calendar,
  Clock,

  // Data & Analytics icons
  TrendingUp,
  Star,
};

// Apply iconWithClassName to all icons
Object.values(icons).forEach((icon) => {
  iconWithClassName(icon);
});

// Export with consistent naming
export const {
  // Auth related icons
  LogIn: LogInIcon,
  Eye: EyeIcon,
  EyeOff: EyeOffIcon,

  // UI icons
  Bell: BellIcon,
  Search: SearchIcon,
  SlidersHorizontal: SlidersHorizontalIcon,

  // Theme icons
  Sun: SunIcon,
  MoonStar: MoonStarIcon,

  // Navigation icons
  ArrowLeft: ArrowLeftIcon,
  ArrowRight: ArrowRightIcon,

  // User & Profile icons
  User: UserIcon,
  UserPlus: UserPlusIcon,

  // Communication icons
  Mail: MailIcon,

  // Status & Feedback icons
  AlertCircle: AlertCircleIcon,
  CheckCircle: CheckCircleIcon,
  HelpCircle: HelpCircleIcon,

  // Action icons
  RefreshCcw: RefreshCcwIcon,
  Settings: SettingsIcon,
  CreditCard: CreditCardIcon,

  // Time & Calendar icons
  Calendar: CalendarIcon,
  Clock: ClockIcon,

  // Data & Analytics icons
  TrendingUp: TrendingUpIcon,
  Star: StarIcon,
} = icons;

// Export all icons as default for easy access
export default icons;

// Type untuk icon names
export type IconName = keyof typeof icons;

// Helper function untuk mendapatkan icon berdasarkan nama
export const getIcon = (name: IconName) => icons[name];
