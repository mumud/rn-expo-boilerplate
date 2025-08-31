/**
 * Icons barrel export - Clean & Centralized approach
 * Export semua icon components dari satu file untuk kemudahan maintenance
 */

// Export all icons from the centralized icons file
export * from "./icons";

// Re-export iconWithClassName utility for external use
export { iconWithClassName } from "./iconWithClassName";

// Backward compatibility exports (optional - bisa dihapus jika tidak diperlukan)
// Ini memungkinkan import yang sudah ada tetap berfungsi
export {
  LogInIcon,
  EyeIcon,
  EyeOffIcon,
  BellIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  SunIcon as Sun,
  MoonStarIcon as MoonStar,
  UserPlusIcon,
  MailIcon,
  ArrowLeftIcon,
  AlertCircleIcon,
  RefreshCcwIcon,
  UserIcon,
  CreditCardIcon,
  SettingsIcon,
  HelpCircleIcon,
  TrendingUpIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  StarIcon,
  ArrowRightIcon,
} from "./icons";
