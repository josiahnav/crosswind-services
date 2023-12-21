﻿// <auto-generated />
using System;
using CrosswindServices.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CrosswindServices.Data.Migrations
{
    [DbContext(typeof(CrosswindServicesDbContext))]
    [Migration("20231221131448_CreateArrangementsTable")]
    partial class CreateArrangementsTable
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("CrosswindServices.Data.Entities.Arrangement", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<decimal?>("Bpm")
                        .HasColumnType("DECIMAL(5,2)")
                        .HasColumnName("bpm");

                    b.Property<string>("Description")
                        .HasMaxLength(500)
                        .HasColumnType("varchar(500)")
                        .HasColumnName("description");

                    b.Property<int>("LengthMinutes")
                        .HasColumnType("int")
                        .HasColumnName("length_minutes");

                    b.Property<int>("LengthSeconds")
                        .HasColumnType("int")
                        .HasColumnName("length_seconds");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)")
                        .HasColumnName("name");

                    b.Property<int>("SongId")
                        .HasColumnType("int")
                        .HasColumnName("song_id");

                    b.Property<string>("TimeSignature")
                        .HasColumnType("longtext")
                        .HasColumnName("time_signature");

                    b.HasKey("Id");

                    b.HasIndex("SongId");

                    b.ToTable("arrangements", (string)null);
                });

            modelBuilder.Entity("CrosswindServices.Data.Entities.Song", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<string>("Composer")
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)")
                        .HasColumnName("composer");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("created");

                    b.Property<DateTime?>("LastScheduled")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("last_scheduled");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("varchar(30)")
                        .HasColumnName("title");

                    b.HasKey("Id");

                    b.ToTable("songs", (string)null);
                });

            modelBuilder.Entity("CrosswindServices.Data.Entities.Arrangement", b =>
                {
                    b.HasOne("CrosswindServices.Data.Entities.Song", "Song")
                        .WithMany("Arrangements")
                        .HasForeignKey("SongId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Song");
                });

            modelBuilder.Entity("CrosswindServices.Data.Entities.Song", b =>
                {
                    b.Navigation("Arrangements");
                });
#pragma warning restore 612, 618
        }
    }
}
