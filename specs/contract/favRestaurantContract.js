const itActsAsFavoriteRestoModel = (FavoriteRestoIdb) => {
    it('should return the resto that has been added', async () => {
        FavoriteRestoIdb.putResto({ id: 1 });
        FavoriteRestoIdb.putResto({ id: 2 });

        expect(await FavoriteRestoIdb.getResto(1)).toEqual({ id: 1 });
        expect(await FavoriteRestoIdb.getResto(2)).toEqual({ id: 2 });
        expect(await FavoriteRestoIdb.getResto(3)).toEqual(undefined);
    });

    it('should refuse a resto from being added if it does not have the correct property', async () => {
        FavoriteRestoIdb.putResto({ aProperty: 'property' });

        expect(await FavoriteRestoIdb.getAllResto()).toEqual([]);
    });

    it('can return all of the resto that have been added', async () => {
        FavoriteRestoIdb.putResto({ id: 1 });
        FavoriteRestoIdb.putResto({ id: 2 });

        expect(await FavoriteRestoIdb.getAllResto()).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it('should remove favorite resto', async () => {
        FavoriteRestoIdb.putResto({ id: 1 });
        FavoriteRestoIdb.putResto({ id: 2 });
        FavoriteRestoIdb.putResto({ id: 3 });

        await FavoriteRestoIdb.deleteResto(1);

        expect(await FavoriteRestoIdb.getAllResto()).toEqual([{ id: 2 }, { id: 3 }]);
    });

    it('should handle request to remove a resto even though the resto has not been added', async () => {
        FavoriteRestoIdb.putResto({ id: 1 });
        FavoriteRestoIdb.putResto({ id: 2 });
        FavoriteRestoIdb.putResto({ id: 3 });

        await FavoriteRestoIdb.deleteResto(4);

        expect(await FavoriteRestoIdb.getAllResto()).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
    });
};

// eslint-disable-next-line import/prefer-default-export
export { itActsAsFavoriteRestoModel };
