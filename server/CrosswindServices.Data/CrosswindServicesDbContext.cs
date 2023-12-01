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
            entity.Property(s => s.Bpm)
                .HasColumnName("bpm")
                .HasColumnType("DECIMAL(5,2)");
            entity.Property(s => s.Created)
                .HasColumnName("created")
                .IsRequired();
            entity.Property(s => s.LastScheduled)
                .HasColumnName("last_scheduled");
        });

        base.OnModelCreating(modelBuilder);
    }
}