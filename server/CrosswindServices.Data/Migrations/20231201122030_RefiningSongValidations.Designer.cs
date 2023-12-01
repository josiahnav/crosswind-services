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
    [Migration("20231201122030_RefiningSongValidations")]
    partial class RefiningSongValidations
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("CrosswindServices.Data.Entities.Song", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<decimal?>("Bpm")
                        .HasColumnType("DECIMAL(5,2)")
                        .HasColumnName("bpm");

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
#pragma warning restore 612, 618
        }
    }
}
