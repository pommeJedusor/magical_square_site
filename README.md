# Set-Up (optional)
you need python installed for it to works
```bash
git clone https://github.com/pommeJedusor/magical_square.git
cd magical_square
# set up the database
python3 db.py
# put all the solutions in it (take a bit of time, there is 33_938_944 of them)
python3 main.py
# move the db
mv ./magical_square_db.db ../
cd ../
# delete the git repo
rm -rf magical_square
```
