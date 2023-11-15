using CrosswindServices.Data;
using Microsoft.EntityFrameworkCore;

namespace CrosswindServices.Repository.Tests.Helpers;

public static class DbContextHelper
{
    public static CrosswindServicesDbContext GetDbContextMock()
    {
        var options = new DbContextOptionsBuilder<CrosswindServicesDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        return new CrosswindServicesDbContext(options);
    }
}