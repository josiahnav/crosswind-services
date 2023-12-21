using CrosswindServices.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace CrosswindServices.Data;

public class CrosswindServicesDbContext : DbContext
{
    public CrosswindServicesDbContext(DbContextOptions<CrosswindServicesDbContext> options) : base(options)
    {
        
    }

    public DbSet<Song> Songs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Song>(entity =>
        {
            entity.ToTable("songs");

            entity.HasKey(s => s.Id);

            entity.Property(s => s.Id)
                .HasColumnName("id");
            entity.Property(s => s.Title)
                .HasColumnName("title")
                .IsRequired()
                .HasMaxLength(30);
            entity.Property(s => s.Composer)
                .HasColumnName("composer")
                .HasMaxLength(100);
            entity.Property(s => s.Created)
                .HasColumnName("created")
                .IsRequired();
            entity.Property(s => s.LastScheduled)
                .HasColumnName("last_scheduled");

            entity.HasMany(s => s.Arrangements)
                .WithOne(a => a.Song)
                .HasForeignKey(a => a.SongId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Arrangement>(entity =>
        {
            entity.ToTable("arrangements");

            entity.HasKey(a => a.Id);

            entity.Property(a => a.Id)
                .HasColumnName("id");
            entity.Property(a => a.Name)
                .HasColumnName("name")
                .IsRequired()
                .HasMaxLength(100);
            entity.Property(a => a.Description)
                .HasColumnName("description")
                .HasMaxLength(500);
            entity.Property(a => a.LengthMinutes)
                .HasColumnName("length_minutes")
                .IsRequired();
            entity.Property(a => a.LengthSeconds)
                .HasColumnName("length_seconds")
                .IsRequired();
            entity.Property(a => a.TimeSignature)
                .HasColumnName("time_signature");
            entity.Property(s => s.Bpm)
                .HasColumnName("bpm")
                .HasColumnType("DECIMAL(5,2)");
            entity.Property(s => s.SongId)
                .HasColumnName("song_id")
                .IsRequired();

            entity.HasOne(a => a.Song)
                .WithMany(s => s.Arrangements)
                .HasForeignKey(a => a.SongId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        });

        base.OnModelCreating(modelBuilder);
    }
}