/**
 * Icons collection - Centralized icon management
 * Using a cleaner approach with one file for all icons
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
  Home,
  ListTodo,
  User2,
  List,

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
  Check,
  X,
  AlertTriangle,
  Info,

  // Action icons
  RefreshCcw,
  Settings,
  CreditCard,
  Plus,
  Edit,
  Trash,
  ChevronDown,
  ChevronUp,

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
  Home,
  ListTodo,
  User2,
  List,

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
  Check,
  X,
  AlertTriangle,
  Info,

  // Action icons
  RefreshCcw,
  Settings,
  CreditCard,
  Plus,
  Edit,
  Trash,
  ChevronDown,
  ChevronUp,

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
  Home: HomeIcon,
  ListTodo: ListTodoIcon,
  User2: User2Icon,
  List: ListIcon,

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
  Check: CheckIcon,
  X: XIcon,
  AlertTriangle: ExclamationTriangleIcon,
  Info: InfoIcon,

  // Action icons
  RefreshCcw: RefreshCcwIcon,
  Settings: SettingsIcon,
  CreditCard: CreditCardIcon,
  Plus: PlusIcon,
  Edit: EditIcon,
  Trash: TrashIcon,
  ChevronDown: ChevronDownIcon,
  ChevronUp: ChevronUpIcon,

  // Time & Calendar icons
  Calendar: CalendarIcon,
  Clock: ClockIcon,

  // Data & Analytics icons
  TrendingUp: TrendingUpIcon,
  Star: StarIcon,
} = icons;

// Export all icons as default for easy access
export default icons;

// Type for icon names
export type IconName = keyof typeof icons;

// Helper function to get icon by name
export const getIcon = (name: IconName) => icons[name];
