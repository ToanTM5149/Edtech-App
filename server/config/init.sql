USE [master]
GO
/****** Object:  Database [edtech_db]    Script Date: 11/27/2024 7:51:38 PM ******/
CREATE DATABASE [edtech_db]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'edtech_db', FILENAME = N'E:\Database\SQLServer\Server\Server1\SQLDATA\edtech_db.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'edtech_db_log', FILENAME = N'E:\Database\SQLServer\Server\Server1\SQLDATA\edtech_db_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [edtech_db] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [edtech_db].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [edtech_db] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [edtech_db] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [edtech_db] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [edtech_db] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [edtech_db] SET ARITHABORT OFF 
GO
ALTER DATABASE [edtech_db] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [edtech_db] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [edtech_db] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [edtech_db] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [edtech_db] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [edtech_db] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [edtech_db] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [edtech_db] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [edtech_db] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [edtech_db] SET  DISABLE_BROKER 
GO
ALTER DATABASE [edtech_db] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [edtech_db] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [edtech_db] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [edtech_db] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [edtech_db] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [edtech_db] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [edtech_db] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [edtech_db] SET RECOVERY FULL 
GO
ALTER DATABASE [edtech_db] SET  MULTI_USER 
GO
ALTER DATABASE [edtech_db] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [edtech_db] SET DB_CHAINING OFF 
GO
ALTER DATABASE [edtech_db] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [edtech_db] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [edtech_db] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [edtech_db] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'edtech_db', N'ON'
GO
ALTER DATABASE [edtech_db] SET QUERY_STORE = ON
GO
ALTER DATABASE [edtech_db] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [edtech_db]
GO
/****** Object:  User [toan2]    Script Date: 11/27/2024 7:51:39 PM ******/
CREATE USER [toan2] FOR LOGIN [toan2] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [toan2]
GO
/****** Object:  Table [dbo].[Courses]    Script Date: 11/27/2024 7:51:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Courses](
	[course_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[course_name] [nvarchar](100) NOT NULL,
	[course_description] [text] NULL,
	[created_at] [datetime] NOT NULL,
	[updated_at] [datetime] NOT NULL,
 CONSTRAINT [PK_Courses_course_id] PRIMARY KEY CLUSTERED 
(
	[course_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LearningHistory]    Script Date: 11/27/2024 7:51:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LearningHistory](
	[history_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[course_id] [int] NOT NULL,
	[last_lesson_id] [int] NULL,
	[last_accessed] [datetime] NOT NULL,
 CONSTRAINT [PK_LearningHistory_history_id] PRIMARY KEY CLUSTERED 
(
	[history_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Lessons]    Script Date: 11/27/2024 7:51:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Lessons](
	[lesson_id] [int] IDENTITY(1,1) NOT NULL,
	[course_id] [int] NOT NULL,
	[lesson_title] [nvarchar](100) NOT NULL,
	[lesson_description] [text] NULL,
	[created_at] [datetime] NOT NULL,
	[updated_at] [datetime] NOT NULL,
 CONSTRAINT [PK_Lessons_lesson_id] PRIMARY KEY CLUSTERED 
(
	[lesson_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Materials]    Script Date: 11/27/2024 7:51:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Materials](
	[material_id] [int] IDENTITY(1,1) NOT NULL,
	[lesson_id] [int] NOT NULL,
	[material_type] [nvarchar](20) NOT NULL,
	[file_path] [nvarchar](255) NOT NULL,
	[file_size] [float] NULL,
	[created_at] [datetime] NOT NULL,
	[updated_at] [datetime] NOT NULL,
 CONSTRAINT [PK_Materials_material_id] PRIMARY KEY CLUSTERED 
(
	[material_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Submissions]    Script Date: 11/27/2024 7:51:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Submissions](
	[submission_id] [int] IDENTITY(1,1) NOT NULL,
	[student_id] [int] NOT NULL,
	[test_id] [int] NOT NULL,
	[submission_content] [text] NULL,
	[submission_date] [datetime] NOT NULL,
	[grade] [float] NULL,
 CONSTRAINT [PK_Submissions_submission_id] PRIMARY KEY CLUSTERED 
(
	[submission_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tests]    Script Date: 11/27/2024 7:51:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tests](
	[test_id] [int] IDENTITY(1,1) NOT NULL,
	[lesson_id] [int] NOT NULL,
	[test_title] [nvarchar](100) NOT NULL,
	[description] [text] NULL,
	[created_at] [datetime] NOT NULL,
	[updated_at] [datetime] NOT NULL,
 CONSTRAINT [PK_Tests_test_id] PRIMARY KEY CLUSTERED 
(
	[test_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 11/27/2024 7:51:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[user_id] [int] IDENTITY(1,1) NOT NULL,
	[username] [nvarchar](50) NOT NULL,
	[password] [nvarchar](255) NOT NULL,
	[full_name] [nvarchar](100) NULL,
	[email] [varchar](100) NOT NULL,
	[role] [nvarchar](20) NOT NULL,
	[phone_numbers] [varchar](10) NULL,
	[address] [nvarchar](256) NULL,
	[city] [nvarchar](100) NULL,
	[country] [nvarchar](100) NULL,
	[created_at] [datetime] NOT NULL,
	[updated_at] [datetime] NOT NULL,
 CONSTRAINT [PK_Users_user_id] PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_Users_email] UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_Users_phone_numbers] UNIQUE NONCLUSTERED 
(
	[phone_numbers] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_Users_username] UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Courses] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Courses] ADD  DEFAULT (getdate()) FOR [updated_at]
GO
ALTER TABLE [dbo].[LearningHistory] ADD  DEFAULT (getdate()) FOR [last_accessed]
GO
ALTER TABLE [dbo].[Lessons] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Lessons] ADD  DEFAULT (getdate()) FOR [updated_at]
GO
ALTER TABLE [dbo].[Materials] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Materials] ADD  DEFAULT (getdate()) FOR [updated_at]
GO
ALTER TABLE [dbo].[Submissions] ADD  DEFAULT (getdate()) FOR [submission_date]
GO
ALTER TABLE [dbo].[Tests] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Tests] ADD  DEFAULT (getdate()) FOR [updated_at]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ('sinh viên') FOR [role]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (getdate()) FOR [updated_at]
GO
ALTER TABLE [dbo].[Courses]  WITH CHECK ADD  CONSTRAINT [FK_Courses_user_id] FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([user_id])
GO
ALTER TABLE [dbo].[Courses] CHECK CONSTRAINT [FK_Courses_user_id]
GO
ALTER TABLE [dbo].[LearningHistory]  WITH CHECK ADD  CONSTRAINT [FK_LearningHistory_course_id] FOREIGN KEY([course_id])
REFERENCES [dbo].[Courses] ([course_id])
GO
ALTER TABLE [dbo].[LearningHistory] CHECK CONSTRAINT [FK_LearningHistory_course_id]
GO
ALTER TABLE [dbo].[LearningHistory]  WITH CHECK ADD  CONSTRAINT [FK_LearningHistory_last_lesson_id] FOREIGN KEY([last_lesson_id])
REFERENCES [dbo].[Lessons] ([lesson_id])
GO
ALTER TABLE [dbo].[LearningHistory] CHECK CONSTRAINT [FK_LearningHistory_last_lesson_id]
GO
ALTER TABLE [dbo].[LearningHistory]  WITH CHECK ADD  CONSTRAINT [FK_LearningHistory_user_id] FOREIGN KEY([user_id])
REFERENCES [dbo].[Users] ([user_id])
GO
ALTER TABLE [dbo].[LearningHistory] CHECK CONSTRAINT [FK_LearningHistory_user_id]
GO
ALTER TABLE [dbo].[Lessons]  WITH CHECK ADD  CONSTRAINT [FK_Lessons_course_id] FOREIGN KEY([course_id])
REFERENCES [dbo].[Courses] ([course_id])
GO
ALTER TABLE [dbo].[Lessons] CHECK CONSTRAINT [FK_Lessons_course_id]
GO
ALTER TABLE [dbo].[Materials]  WITH CHECK ADD  CONSTRAINT [FK_Materials_lesson_id] FOREIGN KEY([lesson_id])
REFERENCES [dbo].[Lessons] ([lesson_id])
GO
ALTER TABLE [dbo].[Materials] CHECK CONSTRAINT [FK_Materials_lesson_id]
GO
ALTER TABLE [dbo].[Submissions]  WITH CHECK ADD  CONSTRAINT [FK_Submissions_student_id] FOREIGN KEY([student_id])
REFERENCES [dbo].[Users] ([user_id])
GO
ALTER TABLE [dbo].[Submissions] CHECK CONSTRAINT [FK_Submissions_student_id]
GO
ALTER TABLE [dbo].[Submissions]  WITH CHECK ADD  CONSTRAINT [FK_Submissions_test_id] FOREIGN KEY([test_id])
REFERENCES [dbo].[Tests] ([test_id])
GO
ALTER TABLE [dbo].[Submissions] CHECK CONSTRAINT [FK_Submissions_test_id]
GO
ALTER TABLE [dbo].[Tests]  WITH CHECK ADD  CONSTRAINT [FK_Tests_lesson_id] FOREIGN KEY([lesson_id])
REFERENCES [dbo].[Lessons] ([lesson_id])
GO
ALTER TABLE [dbo].[Tests] CHECK CONSTRAINT [FK_Tests_lesson_id]
GO
USE [master]
GO
ALTER DATABASE [edtech_db] SET  READ_WRITE 
GO
