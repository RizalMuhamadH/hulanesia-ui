-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: mariadb-default
-- Generation Time: Jul 27, 2021 at 12:02 AM
-- Server version: 10.5.10-MariaDB-1:10.5.10+maria~focal
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hulanesia`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_log`
--

CREATE TABLE `activity_log` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `log_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject_id` bigint(20) UNSIGNED DEFAULT NULL,
  `causer_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `causer_id` bigint(20) UNSIGNED DEFAULT NULL,
  `properties` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`properties`)),
  `batch_uuid` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `activity_log`
--

INSERT INTO `activity_log` (`id`, `log_name`, `description`, `subject_type`, `event`, `subject_id`, `causer_type`, `causer_id`, `properties`, `batch_uuid`, `created_at`, `updated_at`) VALUES
(1, 'default', 'Look mum, I logged something', NULL, NULL, NULL, 'App\\Models\\User', 1, '[]', NULL, '2021-07-04 03:44:41', '2021-07-04 03:44:41'),
(2, 'default', 'Look mum, I logged something', NULL, NULL, NULL, 'App\\Models\\User', 1, '[]', 'c02daca4-5cec-45a1-9054-c14b273ebbe2', '2021-07-04 03:48:54', '2021-07-04 03:48:54'),
(3, 'default', 'open page add post', NULL, NULL, NULL, 'App\\Models\\User', 1, '[]', 'a350ee54-004d-4791-8166-46b16380de9c', '2021-07-04 03:50:23', '2021-07-04 03:50:23'),
(4, 'default', 'my message', NULL, NULL, NULL, 'App\\Models\\User', 1, '[]', '76fe617a-9084-4523-b79c-31e664951143', '2021-07-04 03:56:42', '2021-07-04 03:56:42'),
(5, 'default', 'my message', NULL, NULL, NULL, 'App\\Models\\User', 1, '[]', 'c9b3915e-0aab-42f9-af35-1cc32d093e3e', '2021-07-04 03:59:28', '2021-07-04 03:59:28'),
(6, 'default', 'open add post', 'App\\Models\\Category', NULL, NULL, 'App\\Models\\User', 1, '{\"categories\":[{\"id\":1,\"name\":\"Umum\",\"slug\":\"umum\",\"created_at\":\"2021-06-11T20:36:58.000000Z\",\"updated_at\":\"2021-06-12T05:16:40.000000Z\"},{\"id\":2,\"name\":\"Wisata Alam\",\"slug\":\"wisata-alam\",\"created_at\":\"2021-06-11T20:37:49.000000Z\",\"updated_at\":\"2021-06-11T20:37:49.000000Z\"},{\"id\":3,\"name\":\"Lifestyle\",\"slug\":\"lifestyle\",\"created_at\":\"2021-06-11T20:38:00.000000Z\",\"updated_at\":\"2021-06-11T20:38:00.000000Z\"}],\"tags\":[{\"id\":1,\"name\":\"Ayo Media\",\"slug\":\"ayo-media\",\"created_at\":\"2021-06-12T09:18:33.000000Z\",\"updated_at\":\"2021-06-12T09:18:33.000000Z\"},{\"id\":4,\"name\":\"BMKG\",\"slug\":\"bmkg\",\"created_at\":\"2021-06-19T01:41:36.000000Z\",\"updated_at\":\"2021-06-19T01:41:36.000000Z\"},{\"id\":5,\"name\":\"VIRAL\",\"slug\":\"viral\",\"created_at\":\"2021-06-19T01:41:44.000000Z\",\"updated_at\":\"2021-06-19T01:41:44.000000Z\"}],\"features\":[{\"id\":1,\"name\":\"Headline\",\"created_at\":\"2021-06-12T09:38:01.000000Z\",\"updated_at\":\"2021-06-12T09:38:01.000000Z\"},{\"id\":2,\"name\":\"Breaking News\",\"created_at\":\"2021-06-19T01:42:02.000000Z\",\"updated_at\":\"2021-06-19T01:42:02.000000Z\"}]}', NULL, '2021-07-04 04:08:22', '2021-07-04 04:08:22'),
(7, 'default', 'store post', 'App\\Models\\Post', 'store', 18, 'App\\Models\\User', 1, '{\"post\":{\"title\":\"Jaga Ketahanan Pangan Selama PPKM Darurat, Kota Bogor Dirikan Posko Logistik\",\"slug\":\"\",\"description\":\"Jaga Ketahanan Pangan Selama PPKM Darurat, Kota Bogor Dirikan Posko Logistik\",\"body\":\"<p>Ketua Satgas Covid-19&nbsp;<a class=\\\"related-tag text-orange\\\" href=\\\"https:\\/\\/ayobandung.com\\/tag\\/Kota%20Bogor\\\">Kota Bogor<\\/a>&nbsp;Bima Arya Sugiarto mengatakan,&nbsp;<a class=\\\"related-tag text-orange\\\" href=\\\"https:\\/\\/ayobandung.com\\/tag\\/posko%20logistik\\\">posko logistik<\\/a>&nbsp;tersebut&nbsp;nantinya bakal bertugas mendistribusikan bantuan kepada masyarakat&nbsp;<a class=\\\"related-tag text-orange\\\" href=\\\"https:\\/\\/ayobandung.com\\/tag\\/Kota%20Bogor\\\">Kota Bogor<\\/a>&nbsp;yang kurang mampu, selama menjalani masa pemberlakukan&nbsp;<a class=\\\"related-tag text-orange\\\" href=\\\"https:\\/\\/ayobandung.com\\/tag\\/PPKM%20Darurat\\\">PPKM Darurat<\\/a>. Khususnya mereka yang sedang menjalani isolasi mandiri di kediamannya.<\\/p>\\r\\n<p>&ldquo;Kita lihat banyak warga yang membutuhkan yang kesulitan mencari nafkah karena&nbsp;<a class=\\\"related-tag text-orange\\\" href=\\\"https:\\/\\/ayobandung.com\\/tag\\/PPKM%20Darurat\\\">PPKM Darurat<\\/a>&nbsp;ini. Maka semaksimal mungkin harus kita bantu. Di&nbsp;<a class=\\\"related-tag text-orange\\\" href=\\\"https:\\/\\/ayobandung.com\\/tag\\/posko%20logistik\\\">posko logistik<\\/a>&nbsp;ini kami akan akan alokasikan bantuan logistik dari para donator kepada masyarakat yang benar-benar membutuhkan. Jadi semua satu pintu melalui posko ini agar bantuan tepat sasaran,&rdquo; katanya Minggu 4 Juli 2021.&nbsp;<\\/p>\\r\\n<div id=\\\"article_middle_sas\\\">\\r\\n<div id=\\\"ats-insert_ads-3-wrapper\\\" class=\\\"insert_ads insert_ads-4 show_advertisement\\\">\\r\\n<div>\\r\\n<div id=\\\"ats-insert_ads-3\\\" class=\\\"ats-slot\\\"><\\/div>\\r\\n<\\/div>\\r\\n<\\/div>\\r\\n<\\/div>\\r\\n<p>Bima Arya mengajak Aparatur Sipil Negara (ASN) di lingkungan Pemkot Bogor, perusahaan-perusahaan yang ada di&nbsp;<a class=\\\"related-tag text-orange\\\" href=\\\"https:\\/\\/ayobandung.com\\/tag\\/Kota%20Bogor\\\">Kota Bogor<\\/a>&nbsp;atau perorangan serta komunitas untuk ikut berpartisipasi dalam gerakan #BersamaSalingMenjaga.<\\/p>\",\"source\":null,\"source_link\":null,\"feature_id\":\"2\",\"category_id\":\"1\",\"user_id\":1,\"status\":\"PUBLISH\",\"meta_description\":null,\"meta_keywords\":null,\"seo_title\":null,\"published_at\":\"2021-07-03T17:00:00.000000Z\",\"updated_at\":\"2021-07-04T04:17:42.000000Z\",\"created_at\":\"2021-07-04T04:17:42.000000Z\",\"id\":18,\"tags\":[{\"id\":4,\"name\":\"BMKG\",\"slug\":\"bmkg\",\"created_at\":\"2021-06-19T01:41:36.000000Z\",\"updated_at\":\"2021-06-19T01:41:36.000000Z\",\"pivot\":{\"taggable_id\":18,\"tag_id\":4,\"taggable_type\":\"App\\\\Models\\\\Post\",\"created_at\":\"2021-07-04T04:17:42.000000Z\",\"updated_at\":\"2021-07-04T04:17:42.000000Z\"}}]},\"tags\":[{\"id\":4,\"name\":\"BMKG\",\"slug\":\"bmkg\",\"created_at\":\"2021-06-19T01:41:36.000000Z\",\"updated_at\":\"2021-06-19T01:41:36.000000Z\",\"pivot\":{\"taggable_id\":18,\"tag_id\":4,\"taggable_type\":\"App\\\\Models\\\\Post\",\"created_at\":\"2021-07-04T04:17:42.000000Z\",\"updated_at\":\"2021-07-04T04:17:42.000000Z\"}}]}', NULL, '2021-07-04 04:17:44', '2021-07-04 04:17:44');

-- --------------------------------------------------------

--
-- Table structure for table `bodylinks`
--

CREATE TABLE `bodylinks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bodylinkable_id` bigint(20) UNSIGNED NOT NULL,
  `bodylinkable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'Umum', 'umum', '2021-06-11 20:36:58', '2021-06-12 05:16:40'),
(2, 'Wisata Alam', 'wisata-alam', '2021-06-11 20:37:49', '2021-06-11 20:37:49'),
(3, 'Lifestyle', 'lifestyle', '2021-06-11 20:38:00', '2021-06-11 20:38:00');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `features`
--

CREATE TABLE `features` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `features`
--

INSERT INTO `features` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Headline', '2021-06-12 09:38:01', '2021-06-12 09:38:01'),
(2, 'Breaking News', '2021-06-19 01:42:02', '2021-06-19 01:42:02');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `caption` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imageable_id` bigint(20) UNSIGNED NOT NULL,
  `imageable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `path`, `caption`, `imageable_id`, `imageable_type`, `created_at`, `updated_at`) VALUES
(5, 'users/1/2021/06/1623560981_60c59315b8ee8_RU8chHyxyZ9MIxdMYJAf.png', NULL, 1, 'App\\Models\\User', '2021-06-13 05:09:42', '2021-06-13 05:09:42'),
(6, 'posts/2021/06/19/1624066965_60cd4b9597a89_hAWbzLFhb4YmiPuYqRZ6.png', NULL, 2, 'App\\Models\\Post', '2021-06-19 01:42:46', '2021-06-19 01:42:46'),
(7, 'posts/2021/06/19/1624066965_60cd4b9597a89_hAWbzLFhb4YmiPuYqRZ6.png', NULL, 3, 'App\\Models\\Post', '2021-06-13 05:09:42', '2021-06-13 05:09:42'),
(8, 'posts/2021/06/19/1624066965_60cd4b9597a89_hAWbzLFhb4YmiPuYqRZ6.png', NULL, 4, 'App\\Models\\Post', '2021-06-19 01:42:46', '2021-06-19 01:42:46'),
(9, 'posts/2021/06/19/1624066965_60cd4b9597a89_hAWbzLFhb4YmiPuYqRZ6.png', NULL, 5, 'App\\Models\\Post', '2021-06-13 05:09:42', '2021-06-13 05:09:42'),
(10, 'posts/2021/06/19/1624066965_60cd4b9597a89_hAWbzLFhb4YmiPuYqRZ6.png', NULL, 6, 'App\\Models\\Post', '2021-06-19 01:42:46', '2021-06-19 01:42:46'),
(11, 'posts/2021/06/19/1624066965_60cd4b9597a89_hAWbzLFhb4YmiPuYqRZ6.png', NULL, 7, 'App\\Models\\Post', '2021-06-13 05:09:42', '2021-06-13 05:09:42'),
(12, 'posts/2021/06/19/1624066965_60cd4b9597a89_hAWbzLFhb4YmiPuYqRZ6.png', NULL, 8, 'App\\Models\\Post', '2021-06-19 01:42:46', '2021-06-19 01:42:46'),
(13, 'posts/2021/06/19/1624066965_60cd4b9597a89_hAWbzLFhb4YmiPuYqRZ6.png', NULL, 9, 'App\\Models\\Post', '2021-06-13 05:09:42', '2021-06-13 05:09:42'),
(14, 'posts/2021/06/19/1624066965_60cd4b9597a89_hAWbzLFhb4YmiPuYqRZ6.png', NULL, 10, 'App\\Models\\Post', '2021-06-19 01:42:46', '2021-06-19 01:42:46'),
(15, 'posts/2021/06/19/1624066965_60cd4b9597a89_hAWbzLFhb4YmiPuYqRZ6.png', NULL, 11, 'App\\Models\\Post', '2021-06-13 05:09:42', '2021-06-13 05:09:42'),
(16, 'posts/2021/06/19/1624066965_60cd4b9597a89_hAWbzLFhb4YmiPuYqRZ6.png', NULL, 12, 'App\\Models\\Post', '2021-06-19 01:42:46', '2021-06-19 01:42:46'),
(17, 'posts/2021/06/19/1624066965_60cd4b9597a89_hAWbzLFhb4YmiPuYqRZ6.png', NULL, 13, 'App\\Models\\Post', '2021-06-13 05:09:42', '2021-06-13 05:09:42'),
(18, 'posts/2021/06/19/1624066965_60cd4b9597a89_hAWbzLFhb4YmiPuYqRZ6.png', NULL, 14, 'App\\Models\\Post', '2021-06-19 01:42:46', '2021-06-19 01:42:46'),
(19, 'posts/2021/06/19/1624066965_60cd4b9597a89_hAWbzLFhb4YmiPuYqRZ6.png', NULL, 15, 'App\\Models\\Post', '2021-06-13 05:09:42', '2021-06-13 05:09:42'),
(20, 'posts/2021/06/19/1624066965_60cd4b9597a89_hAWbzLFhb4YmiPuYqRZ6.png', NULL, 16, 'App\\Models\\Post', '2021-06-19 01:42:46', '2021-06-19 01:42:46'),
(21, 'posts/2021/06/19/1624066965_60cd4b9597a89_hAWbzLFhb4YmiPuYqRZ6.png', NULL, 1, 'App\\Models\\Post', '2021-06-19 01:42:46', '2021-06-19 01:42:46'),
(22, 'posts/2021/07/04/1625371168_60e13220ecbeb_RV4T835xi7StIdMyLDr5.jpeg', NULL, 17, 'App\\Models\\Post', '2021-07-04 03:59:29', '2021-07-04 03:59:29'),
(23, 'posts/2021/07/04/1625372262_60e13666ba4be_XcEJMlHWneVx5DgaPeJR.png', NULL, 18, 'App\\Models\\Post', '2021-07-04 04:17:44', '2021-07-04 04:17:44');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(23, '2019_08_19_000000_create_failed_jobs_table', 1),
(24, '2021_06_05_082652_create_categories_table', 2),
(25, '2021_06_05_082737_create_images_table', 3),
(27, '2021_06_05_083012_create_tags_table', 3),
(29, '2021_06_05_084958_create_features_table', 3),
(30, '2021_06_05_082720_create_posts_table', 4),
(31, '2021_06_05_083539_create_bodylinks_table', 5),
(32, '2021_06_05_082753_create_videos_table', 6),
(33, '2021_06_06_113848_create_taggables_table', 6),
(34, '2014_10_12_000000_create_users_table', 7),
(35, '2014_10_12_100000_create_password_resets_table', 8),
(36, '2014_10_12_200000_add_two_factor_columns_to_users_table', 8),
(37, '2021_06_26_082223_create_permission_tables', 9),
(38, '2021_07_03_144716_create_views_table', 10),
(39, '2021_07_03_221100_create_activity_log_table', 11),
(40, '2021_07_03_221101_add_event_column_to_activity_log_table', 11),
(41, '2021_07_03_221102_add_batch_uuid_column_to_activity_log_table', 11);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(1, 'App\\Models\\User', 3);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'browse_categories', 'web', '2021-06-26 02:18:02', '2021-06-26 02:18:02'),
(2, 'read_categories', 'web', '2021-06-26 02:18:02', '2021-06-26 02:18:02'),
(3, 'edit_categories', 'web', '2021-06-26 02:18:02', '2021-06-26 02:18:02'),
(4, 'add_categories', 'web', '2021-06-26 02:18:02', '2021-06-26 02:18:02'),
(5, 'delete_categories', 'web', '2021-06-26 02:18:02', '2021-06-26 02:18:02'),
(6, 'browse_roles', 'web', '2021-06-26 02:18:03', '2021-06-26 02:18:03'),
(7, 'read_roles', 'web', '2021-06-26 02:18:03', '2021-06-26 02:18:03'),
(8, 'edit_roles', 'web', '2021-06-26 02:18:03', '2021-06-26 02:18:03'),
(9, 'add_roles', 'web', '2021-06-26 02:18:03', '2021-06-26 02:18:03'),
(10, 'delete_roles', 'web', '2021-06-26 02:18:03', '2021-06-26 02:18:03'),
(11, 'browse_users', 'web', '2021-06-26 02:18:03', '2021-06-26 02:18:03'),
(12, 'read_users', 'web', '2021-06-26 02:18:03', '2021-06-26 02:18:03'),
(13, 'edit_users', 'web', '2021-06-26 02:18:03', '2021-06-26 02:18:03'),
(14, 'add_users', 'web', '2021-06-26 02:18:03', '2021-06-26 02:18:03'),
(15, 'delete_users', 'web', '2021-06-26 02:18:03', '2021-06-26 02:18:03'),
(16, 'browse_tags', 'web', '2021-06-26 02:18:03', '2021-06-26 02:18:03'),
(17, 'read_tags', 'web', '2021-06-26 02:18:03', '2021-06-26 02:18:03'),
(18, 'edit_tags', 'web', '2021-06-26 02:18:03', '2021-06-26 02:18:03'),
(19, 'add_tags', 'web', '2021-06-26 02:18:03', '2021-06-26 02:18:03'),
(20, 'delete_tags', 'web', '2021-06-26 02:18:03', '2021-06-26 02:18:03'),
(21, 'browse_features', 'web', '2021-06-26 02:18:03', '2021-06-26 02:18:03'),
(22, 'read_features', 'web', '2021-06-26 02:18:03', '2021-06-26 02:18:03'),
(23, 'edit_features', 'web', '2021-06-26 02:18:03', '2021-06-26 02:18:03'),
(24, 'add_features', 'web', '2021-06-26 02:18:03', '2021-06-26 02:18:03'),
(25, 'delete_features', 'web', '2021-06-26 02:18:03', '2021-06-26 02:18:03'),
(26, 'browse_posts', 'web', '2021-06-26 02:18:03', '2021-06-26 02:18:03'),
(27, 'read_posts', 'web', '2021-06-26 02:18:03', '2021-06-26 02:18:03'),
(28, 'edit_posts', 'web', '2021-06-26 02:18:03', '2021-06-26 02:18:03'),
(29, 'add_posts', 'web', '2021-06-26 02:18:03', '2021-06-26 02:18:03'),
(30, 'delete_posts', 'web', '2021-06-26 02:18:03', '2021-06-26 02:18:03');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `source` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `source_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `feature_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DRAFT',
  `meta_description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meta_keywords` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `seo_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `published_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `slug`, `description`, `body`, `source`, `source_link`, `feature_id`, `category_id`, `user_id`, `status`, `meta_description`, `meta_keywords`, `seo_title`, `published_at`, `created_at`, `updated_at`) VALUES
(1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry 2', '', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', '<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 2, 2, 1, 'PUBLISH', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', NULL, '2021-06-19 00:00:00', '2021-06-19 01:42:45', '2021-06-19 02:20:42'),
(2, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry 3', '', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', '<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 1, 1, 1, 'PUBLISH', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', NULL, '2021-06-19 00:00:00', '2021-06-19 01:42:45', '2021-06-19 02:20:42'),
(3, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry 3', '', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', '<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 2, 1, 1, 'PUBLISH', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', NULL, '2021-06-19 00:00:00', '2021-06-19 01:42:45', '2021-06-19 02:20:42'),
(4, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry 4', '', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', '<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 1, 1, 1, 'PUBLISH', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', NULL, '2021-06-19 00:00:00', '2021-06-19 01:42:45', '2021-06-19 02:20:42'),
(5, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry 6', '', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', '<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 2, 1, 1, 'PUBLISH', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', NULL, '2021-06-19 00:00:00', '2021-06-19 01:42:45', '2021-06-19 02:20:42'),
(6, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry 7', '', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', '<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 1, 2, 1, 'PUBLISH', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', NULL, '2021-06-19 00:00:00', '2021-06-19 01:42:45', '2021-06-19 02:20:42'),
(7, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry 8', '', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', '<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 2, 2, 1, 'PUBLISH', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', NULL, '2021-06-19 00:00:00', '2021-06-19 01:42:45', '2021-06-19 02:20:42'),
(8, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry 9', '', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', '<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 1, 2, 1, 'PUBLISH', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', NULL, '2021-06-19 00:00:00', '2021-06-19 01:42:45', '2021-06-19 02:20:42'),
(9, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry 10', '', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', '<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 2, 2, 1, 'PUBLISH', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', NULL, '2021-06-19 00:00:00', '2021-06-19 01:42:45', '2021-06-19 02:20:42'),
(10, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry 11', '', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', '<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 1, 2, 1, 'PUBLISH', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', NULL, '2021-06-19 00:00:00', '2021-06-19 01:42:45', '2021-06-19 02:20:42'),
(11, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry 12', '', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', '<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 2, 2, 1, 'PUBLISH', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', NULL, '2021-06-19 00:00:00', '2021-06-19 01:42:45', '2021-06-19 02:20:42'),
(12, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry 13', '', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', '<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 1, 3, 1, 'PUBLISH', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', NULL, '2021-06-19 00:00:00', '2021-06-19 01:42:45', '2021-06-19 02:20:42'),
(13, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry 14', '', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', '<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 2, 3, 1, 'PUBLISH', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', NULL, '2021-06-19 00:00:00', '2021-06-19 01:42:45', '2021-06-19 02:20:42'),
(14, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry 15', '', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', '<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 1, 3, 1, 'PUBLISH', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', NULL, '2021-06-19 00:00:00', '2021-06-19 01:42:45', '2021-06-19 02:20:42'),
(15, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry 16', '', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', '<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 2, 3, 1, 'PUBLISH', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', NULL, '2021-06-19 00:00:00', '2021-06-19 01:42:45', '2021-06-19 02:20:42'),
(16, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry 17', '', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', '<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 1, 3, 1, 'PUBLISH', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', NULL, '2021-06-19 00:00:00', '2021-06-19 01:42:45', '2021-06-19 02:20:42'),
(17, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', '<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>', NULL, NULL, 2, 2, 1, 'PUBLISH', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', NULL, '2021-07-04 00:00:00', '2021-07-04 03:59:28', '2021-07-04 03:59:28'),
(18, 'Jaga Ketahanan Pangan Selama PPKM Darurat, Kota Bogor Dirikan Posko Logistik', '', 'Jaga Ketahanan Pangan Selama PPKM Darurat, Kota Bogor Dirikan Posko Logistik', '<p>Ketua Satgas Covid-19&nbsp;<a class=\"related-tag text-orange\" href=\"https://ayobandung.com/tag/Kota%20Bogor\">Kota Bogor</a>&nbsp;Bima Arya Sugiarto mengatakan,&nbsp;<a class=\"related-tag text-orange\" href=\"https://ayobandung.com/tag/posko%20logistik\">posko logistik</a>&nbsp;tersebut&nbsp;nantinya bakal bertugas mendistribusikan bantuan kepada masyarakat&nbsp;<a class=\"related-tag text-orange\" href=\"https://ayobandung.com/tag/Kota%20Bogor\">Kota Bogor</a>&nbsp;yang kurang mampu, selama menjalani masa pemberlakukan&nbsp;<a class=\"related-tag text-orange\" href=\"https://ayobandung.com/tag/PPKM%20Darurat\">PPKM Darurat</a>. Khususnya mereka yang sedang menjalani isolasi mandiri di kediamannya.</p>\r\n<p>&ldquo;Kita lihat banyak warga yang membutuhkan yang kesulitan mencari nafkah karena&nbsp;<a class=\"related-tag text-orange\" href=\"https://ayobandung.com/tag/PPKM%20Darurat\">PPKM Darurat</a>&nbsp;ini. Maka semaksimal mungkin harus kita bantu. Di&nbsp;<a class=\"related-tag text-orange\" href=\"https://ayobandung.com/tag/posko%20logistik\">posko logistik</a>&nbsp;ini kami akan akan alokasikan bantuan logistik dari para donator kepada masyarakat yang benar-benar membutuhkan. Jadi semua satu pintu melalui posko ini agar bantuan tepat sasaran,&rdquo; katanya Minggu 4 Juli 2021.&nbsp;</p>\r\n<div id=\"article_middle_sas\">\r\n<div id=\"ats-insert_ads-3-wrapper\" class=\"insert_ads insert_ads-4 show_advertisement\">\r\n<div>\r\n<div id=\"ats-insert_ads-3\" class=\"ats-slot\"></div>\r\n</div>\r\n</div>\r\n</div>\r\n<p>Bima Arya mengajak Aparatur Sipil Negara (ASN) di lingkungan Pemkot Bogor, perusahaan-perusahaan yang ada di&nbsp;<a class=\"related-tag text-orange\" href=\"https://ayobandung.com/tag/Kota%20Bogor\">Kota Bogor</a>&nbsp;atau perorangan serta komunitas untuk ikut berpartisipasi dalam gerakan #BersamaSalingMenjaga.</p>', NULL, NULL, 2, 1, 1, 'PUBLISH', NULL, NULL, NULL, '2021-07-04 00:00:00', '2021-07-04 04:17:42', '2021-07-04 04:17:42');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'web', '2021-06-26 03:29:31', '2021-06-26 03:29:31'),
(2, 'editor', 'web', '2021-06-26 04:02:21', '2021-06-26 04:02:21');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2),
(3, 1),
(3, 2),
(4, 1),
(4, 2),
(5, 1),
(5, 2),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 1),
(16, 2),
(17, 1),
(17, 2),
(18, 1),
(18, 2),
(19, 1),
(19, 2),
(20, 1),
(20, 2),
(21, 1),
(22, 1),
(23, 1),
(24, 1),
(25, 1),
(26, 1),
(26, 2),
(27, 1),
(27, 2),
(28, 1),
(28, 2),
(29, 1),
(29, 2),
(30, 1),
(30, 2);

-- --------------------------------------------------------

--
-- Table structure for table `taggables`
--

CREATE TABLE `taggables` (
  `tag_id` bigint(20) UNSIGNED NOT NULL,
  `taggable_id` bigint(20) UNSIGNED NOT NULL,
  `taggable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `taggables`
--

INSERT INTO `taggables` (`tag_id`, `taggable_id`, `taggable_type`, `created_at`, `updated_at`) VALUES
(1, 1, 'App\\Models\\Post', '2021-06-19 02:20:42', '2021-06-19 02:20:42'),
(4, 1, 'App\\Models\\Post', '2021-06-19 02:20:42', '2021-06-19 02:20:42'),
(5, 1, 'App\\Models\\Post', '2021-06-19 02:20:42', '2021-06-19 02:20:42'),
(4, 17, 'App\\Models\\Post', '2021-07-04 03:59:28', '2021-07-04 03:59:28'),
(5, 17, 'App\\Models\\Post', '2021-07-04 03:59:28', '2021-07-04 03:59:28'),
(4, 18, 'App\\Models\\Post', '2021-07-04 04:17:42', '2021-07-04 04:17:42');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'Ayo Media', 'ayo-media', '2021-06-12 09:18:33', '2021-06-12 09:18:33'),
(4, 'BMKG', 'bmkg', '2021-06-19 01:41:36', '2021-06-19 01:41:36'),
(5, 'VIRAL', 'viral', '2021-06-19 01:41:44', '2021-06-19 01:41:44');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `two_factor_recovery_codes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Rizal Muhamad H', 'admin@admin.com', NULL, '$2y$10$CCbNUqoPYa7oMUsnkxT8GerTlL2JZQg3AWdE.oFR7y38UVQ1S29Uq', NULL, NULL, NULL, '2021-06-11 05:49:28', '2021-06-13 03:57:16'),
(2, 'Rizal', 'rizal.muhamad@ayomedia.com', NULL, '$2y$10$CoWMHyHyjJmiQC1tPJfqm.H77qLowvf2SBKcDdG67YG89zTKGZ2Vy', NULL, NULL, NULL, '2021-06-12 17:25:48', '2021-06-12 17:27:57'),
(3, 'Administrator', 'rizalm52@gmail.com', NULL, '$2y$10$hzBTDghzRW2he/c1uCZTbuiGffEo1GFuYgD5etXJv9m4JWI02QZqK', NULL, NULL, NULL, '2021-06-26 03:46:22', '2021-06-26 03:46:22');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `videoable_id` bigint(20) UNSIGNED NOT NULL,
  `videoable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `views`
--

CREATE TABLE `views` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `viewable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `viewable_id` bigint(20) UNSIGNED NOT NULL,
  `visitor` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `collection` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `viewed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_log`
--
ALTER TABLE `activity_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subject` (`subject_type`,`subject_id`),
  ADD KEY `causer` (`causer_type`,`causer_id`),
  ADD KEY `activity_log_log_name_index` (`log_name`);

--
-- Indexes for table `bodylinks`
--
ALTER TABLE `bodylinks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `features`
--
ALTER TABLE `features`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `posts_category_id_foreign` (`category_id`),
  ADD KEY `posts_user_id_foreign` (`user_id`),
  ADD KEY `posts_feature_id_foreign` (`feature_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `views`
--
ALTER TABLE `views`
  ADD PRIMARY KEY (`id`),
  ADD KEY `views_viewable_type_viewable_id_index` (`viewable_type`,`viewable_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_log`
--
ALTER TABLE `activity_log`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `bodylinks`
--
ALTER TABLE `bodylinks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `features`
--
ALTER TABLE `features`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `views`
--
ALTER TABLE `views`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `posts_feature_id_foreign` FOREIGN KEY (`feature_id`) REFERENCES `features` (`id`),
  ADD CONSTRAINT `posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
